import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [option, setOption] = useState([]);

  useEffect(() => {
    axios
      .get("https://libretranslate.de/languages", {
        header: { accept: "application/json" },
      })
      .then((res) => {
        setOption(res.data);
      });
  }, []);

  function translate() {
    const searchParams = new URLSearchParams();
    searchParams.append("q", input);
    searchParams.append("source", from);
    searchParams.append("target", to);
    searchParams.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    axios
      .post("https://libretranslate.de/translate", searchParams, {
        header: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        setOutput(res.data.translatedText);
      });
  }

  return (
    <div className="main">
      <div className="from-lang">
        <div className="header">
          <p>From</p>{" "}
          <select onChange={(e) => setFrom(e.target.value)}>
            {option &&
              option.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
          </select>
          <button className="clear" onClick={() => setInput("")}>
            Clear
          </button>
        </div>
        <textarea
          rows="20"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        ></textarea>
        <div className="footer">
          <button onClick={translate}>Translate</button>
          <button
            onClick={() => {
              setInput("");
              setOutput("");
            }}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="to-lang">
        <div className="header">
          <p>To</p>{" "}
          <select onChange={(e) => setTo(e.target.value)}>
            {option &&
              option.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
          </select>
          <button className="clear" onClick={() => setOutput("")}>
            Clear
          </button>
        </div>
        <textarea rows="20" value={output}></textarea>
      </div>
    </div>
  );
}

export default App;
