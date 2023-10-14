from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from werkzeug.utils import secure_filename
from uuid import uuid4
import os
import subprocess
import tempfile
import mysql.connector
import re


app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


def run_slither_analysis(input_file_path):
    try:
        slither_output = subprocess.check_output(['slither', input_file_path], stderr=subprocess.STDOUT, text=True)
        return slither_output
    except subprocess.CalledProcessError as e:
        return f'Error analyzing contract: {e.output}'

def extract_references(slither_output):
    references = []
    lines = slither_output.split('\n')
    for line in lines:
        if line.startswith("Reference:"):
            parts = line.split("#", 1)
            if len(parts) > 1:
                references.append(parts[1].strip())
    return references

@app.route('/api/query', methods=['GET'])
def query_database():
    try:
        # Connect to the database
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="s104139021",
            database="mypythondb"
        )

        # Create a cursor object to execute SQL queries
        cursor = conn.cursor()

        result_file = open('results.md', 'w')
        results_list = []

        # Open the vulnerabilities.txt file and read its lines
        with open('vulnerabilities.txt', 'r') as file:
            for line in file:
                # Extract the string from each line
                vulnerability_name = line.strip()

                query = "SELECT * FROM vulnerability WHERE name = '" + vulnerability_name + "';"

                # Execute the SQL query with the extracted name
                cursor.execute(query)

                # Fetch the results
                results = cursor.fetchall()

                # Adding to the results.txt file
                for row in results:
                    result_file.write(', '.join(map(str, row)) + '\n')
                    results_list.append(row)

        # Close the cursor and connection
        cursor.close()
        conn.close()

        # Return the results as JSON
        return jsonify({'results': results_list})

    except mysql.connector.Error as e:
        return jsonify({'error': f"Error: {e}"})

@app.route('/api/history', methods=['GET'])
def get_history():
    try:
        # Connect to the database
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="s104139021",
            database="mypythondb"
        )

        # Create a cursor object to execute SQL queries
        cursor = conn.cursor()

        # Retrieve unique file names from the database
        query = "SELECT DISTINCT file_name, file_contents FROM history;"
        cursor.execute(query)
        results = cursor.fetchall()

        # Close the cursor and connection
        cursor.close()
        conn.close()

        # Return the unique file names as JSON
        history = [{'file_name': row[0], 'file_content': row[1].replace('.', '.\n')} for row in results]
        return jsonify({'history': history})

    except mysql.connector.Error as e:
        return jsonify({'error': f"Error: {e}"})

@app.route('/api/history/download/<file_name>', methods=['GET'])
def download_history(file_name):
    try:
        # Connect to the database
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="s104139021",
            database="mypythondb"
        )

        # Create a cursor object to execute SQL queries
        cursor = conn.cursor()

        # Retrieve the contents of the specified file from the database
        query = "SELECT file_contents FROM history WHERE file_name = %s;"
        cursor.execute(query, (file_name,))
        result = cursor.fetchone()

        # Close the cursor and connection
        cursor.close()
        conn.close()

        if result:
            file_contents = result[0]

            # Send the file to the client for download
            response = make_response(file_contents)
            response.headers["Content-Disposition"] = f"attachment; filename={file_name}"
            return response
        else:
            return jsonify({'error': 'File not found'})

    except mysql.connector.Error as e:
        return jsonify({'error': f"Error: {e}"})
    

@app.route('/api/analyze', methods=['POST'])
def analyze_contract():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        # Generate a unique ID
        unique_id = str(uuid4())

        # Use the uploaded file's original name and add the unique ID
        filename = secure_filename(f"{file.filename}-{unique_id}.sol")

        # Save the file with the new filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        # Run Slither analysis
        try:
            print("Before slither")
            slither_output = run_slither_analysis(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            print("After slither")

            # Extracting references
            references = extract_references(slither_output)
            print(slither_output)

            with open("vulnerabilities.txt", "w") as vuln_file:
                for reference in references:
                    vuln_file.write(reference + "\n")

            with open("results.md", "r") as results_file:
                file_contents = results_file.read()
        
            # Save the results to the database with the unique name
            with open(f"uploads/{filename}", "w") as md_file:
                md_file.write(slither_output)

            # Insert the unique name and file contents into the 'history' table
            conn = mysql.connector.connect(
                host="localhost",
                user="root",
                password="s104139021",
                database="mypythondb"
            )
            cursor = conn.cursor()

            insert_query = "INSERT INTO history (file_name, file_contents) VALUES (%s, %s);"
            cursor.execute(insert_query, (filename, file_contents))
            conn.commit()
            conn.close()

            return jsonify({'results': slither_output, 'file_name': filename, 'unique_id': unique_id})

        except subprocess.CalledProcessError as e:
            return jsonify({'error': f'Error analyzing contract: {e.output}'})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)

