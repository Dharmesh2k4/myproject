
import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";

class Message extends React.Component {
  state = {
    chat: [],
    msg: "",
    isListening: false,
    suggestionsSets: [
      [
        "I have fever",
        "Symptoms of Hiv",
        "Tell me about cancer",
        "Nearby hospital",
        "I have Cold",
      ],
      [
        "How to cure cough?",
        "How to give CPR?",
        "Breast Cancer",
        "How long periods stay?",
        "How can I lose weight?",
      ],
      [
        "Symptoms of Flu",
        "symptoms of COVID-19",
        "signs of Asthma",
        "how to quit smoking",
        "how to quit drinking",
      ],
    ],
    currentSuggestionsIndex: 0,
    suggestions: [],
  };

  recognition = new window.webkitSpeechRecognition();
  speechSynthesis = window.speechSynthesis;

  componentDidMount() {
    this.setupRecognition();
    this.startSuggestionInterval();
  }

  componentWillUnmount() {
    clearInterval(this.suggestionInterval);
  }

  startSuggestionInterval = () => {
    this.suggestionInterval = setInterval(() => {
      const { suggestionsSets, currentSuggestionsIndex } = this.state;
      const nextIndex =
        (currentSuggestionsIndex + 1) % suggestionsSets.length;

      this.setState({
        suggestions: suggestionsSets[nextIndex],
        currentSuggestionsIndex: nextIndex,
      });
    }, 10000); // Change suggestions every 10 seconds

    // Initialize suggestions with the first set
    this.setState({
      suggestions: this.state.suggestionsSets[0],
    });
  };

  setupRecognition = () => {
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = "en-US";

    this.recognition.onresult = this.handleSpeechResult;
    this.recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      this.stopListening();
    };
    this.recognition.onend = () => {
      if (this.state.isListening) {
        // Restart recognition if still in listening mode
        this.startListening();
      }
    };
  };

  startListening = () => {
    this.setState({ isListening: true });
    this.recognition.start();
  };

  stopListening = () => {
    this.setState({ isListening: false });
    this.recognition.stop();
  };

  handleSpeechResult = (event) => {
    const transcript = event.results[0][0].transcript;
    this.setState({ msg: transcript });
    this.sendChatMessage();
  };

  handleChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.sendChatMessage();
    }
  };

  sendChatMessage = () => {
    if (this.state.msg !== "") {
      axios
        .post("http://127.0.0.1:5000/user", { msg: this.state.msg })  //flask server address
        .then((res) => {
          let ch = this.state.chat;
          ch.push({ from: "our", msag: this.state.msg });
          ch.push({ from: "cb", msag: res.data });
          this.setState({ chat: ch, msg: "" });

          // Use Web Speech API to read the response
          const utterance = new SpeechSynthesisUtterance(res.data);
          utterance.onerror = (event) => {
            console.error("Speech synthesis error:", event.error);
            // Handle errors, e.g., restart synthesis or notify the user
          };
          this.speechSynthesis.cancel(); // Cancel any ongoing speech synthesis
          this.speechSynthesis.speak(utterance);
        })
        .catch((err) => {
          console.error("Error sending chat message:", err);
        });

      let interval = window.setInterval(() => {
        var elem = document.getElementById("chatt");
        elem.scrollTop = elem.scrollHeight;
        window.clearInterval(interval);
      }, 1000);
    }
  };

  handleSuggestionClick = (suggestion) => {
    this.setState({ msg: suggestion });
    this.sendChatMessage();
  };

  render() {
    return (
      <div>
        <div
          id="chatt"
          style={{
            overflow: "scroll",
            overflowX: "hidden",
            height: "87vh",
          }}
        >
          {this.state.chat.map((msg, index) => (
            <div
              key={index}
              style={{
                flexWrap: "wrap",
                fontSize: "16px",
                marginBottom: "10px",
                borderRadius: "100px",
                marginRight: msg.from === "cb" ? "500px" : "",
                marginLeft: msg.from !== "cb" ? "500px" : "",
                padding: "20px",
                width: "30%",
                backgroundColor: msg.from === "cb" ? "black" : "orange",
                color: msg.from === "cb" ? "white" : "black",
                float: msg.from === "cb" ? "left" : "right",
                display: "block",
              }}
            >
              {msg.msag}
            </div>
          ))}
        </div>
        <div>
          {this.state.suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => this.handleSuggestionClick(suggestion)}
              className="btn btn-outline-secondary"
              style={{ marginRight: "5px", marginBottom: "2px" }}
            >
              {suggestion}
            </button>
          ))}
        </div>
        <div style={{ height: "1vh" ,marginBottom:"10px"}}>
          <input
            type="text"
            name="msg"
            onChange={(e) => this.handleChange(e)}
            onKeyPress={(e) => this.handleKeyPress(e)}
            className="form-control"
            style={{
              marginLeft: "150px",
              width: "80%",
              float: "left",
            }}
            value={this.state.msg}
          />
          <button
            onClick={() => this.sendChatMessage()}
            style={{
              paddingLeft: "25px",
              paddingRight: "25px",
              marginBottom: "11px",
            }}
            className="btn btn-primary"
          >
            Send
          </button>
          <button
            onClick={
              this.state.isListening
                ? this.stopListening
                : this.startListening
            }
            style={{ marginLeft: "10px" }}
          >
            {this.state.isListening ? (
              <FontAwesomeIcon icon={faStop} size="2x" color="red" />
            ) : (
              <FontAwesomeIcon icon={faMicrophone} size="2x" color="blue" />
            )}
          </button>
        </div>
      </div>
    );
  }
}

export default Message;
