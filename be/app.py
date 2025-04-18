# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import sqlite3

app = Flask(__name__)
CORS(app)

DB_NAME = "quotes.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS quotes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    contractorName TEXT,
                    company TEXT,
                    roofSize REAL,
                    roofType TEXT,
                    city TEXT,
                    state TEXT,
                    date TEXT
                )''')
    conn.commit()
    conn.close()

init_db()

@app.route("/api/quotes", methods=["POST"])
@cross_origin()
def add_quote():
    data = request.get_json()
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("INSERT INTO quotes (contractorName, company, roofSize, roofType, city, state, date) VALUES (?, ?, ?, ?, ?, ?, ?)",
              (data['contractorName'], data['company'], data['roofSize'], data['roofType'], data['city'], data['state'], data['date']))
    conn.commit()
    conn.close()
    return jsonify({"message": "Quote added successfully"})

@app.route("/api/quotes", methods=["GET"])
@cross_origin()
def get_quotes():
    state = request.args.get('state')
    roofType = request.args.get('roofType')

    query = 'SELECT * FROM quotes WHERE 1=1'
    params = []

    if state:
        query += ' AND state = ?'
        params.append(state)

    if roofType:
        query += ' AND roofType = ?'
        params.append(roofType)

    conn = sqlite3.connect('quotes.db')
    c = conn.cursor()
    c.execute(query, params)
    rows = c.fetchall()
    conn.close()

    quotes = [{
        'id': row[0],
        'contractor_name': row[1],
        'company': row[2],
        'roofSize': row[3],
        'roofType': row[4],
        'city': row[5],
        'state': row[6],
        'project_date': row[7]
    } for row in rows]

    return jsonify(quotes)
# def get_quotes():
#     conn = sqlite3.connect(DB_NAME)
#     c = conn.cursor()
#     c.execute("SELECT contractorName, company, roofSize, roofType, city, state, date FROM quotes")
#     rows = c.fetchall()
#     quotes = [
#         {"contractorName": r[0], "company": r[1], "roofSize": r[2], "roofType": r[3], "city": r[4], "state": r[5], "date": r[6]}
#         for r in rows
#     ]
#     return jsonify(quotes)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
