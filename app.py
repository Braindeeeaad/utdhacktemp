from flask import Flask, request, jsonify
import os
import openai
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

client = openai.OpenAI(
    api_key=os.environ.get("SAMBANOVA_API_KEY"),
    base_url="https://api.sambanova.ai/v1",
)


def combine_and_query_model(text1: str, text2: str) -> str:
    formatted_text = (f"Input 1: {text1}\nInput 2: {text2}\n\nPlease combine both of these texts "+
                      f"while eliminating redundancy and formatting the output, do not repeate the prompt, just have the output .")
    response = client.chat.completions.create(
        model='Meta-Llama-3.1-8B-Instruct',
        messages=[
            {"role": "system", "content": "You are a robust code merger."},
            {"role": "user", "content": formatted_text}
        ],
        temperature=0.1,
        top_p=0.1
    )
    return response.choices[0].message.content


@app.route('/process', methods=['POST'])
def process_text():
    if request.method == 'POST':
        data = request.get_json()
        text1 = data.get('text1', '')
        text2 = data.get('text2', '')

    if not text1 or not text2:
        return jsonify({'error': 'Please provide both text1 and text2'}), 400

    try:
        result = combine_and_query_model(text1, text2)
        return jsonify({"response":result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run()
