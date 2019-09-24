class ChatService{
    constructor(){

        this.context = ''
        this.baseUrl = ''
        this.lastPicture = null
        this.typeListCheckedBeforeSend = ["Select", "Rating", "Feedback"]
        this.toBeCheckedBeforeSend = false
        this.lastSentDate = null;
        this.barcode=null;
    }

    initialize = (baseUrl, context) =>
    {
        this.baseUrl = baseUrl
        this.context = context
    }

    getInitialDefaultMaxMessages = () => {
        var messages = [{text: 'Hi, I am MAX! Welcome.', from:'MAX', type:'', options:[]}]
        messages.push({text: "I am your personal assistant, I will help you place small and bulk orders of vehicle at any time.", from: "MAX", type:'', options:[]});
        messages.push({text: "Here a few things you can do with me: \n Type \" Restart\" to start the conversaton. \n Type \" Find Cheaper\" to find a cheaper car offer. \nType \"Help\" to see contextual help and help menu.", from: "MAX", from: "MAX", type:'', options:[]});
        return messages        
    }
        
    // getMaxMessages = (responseMessage) => {
    //     var messages = []
    //     if (this.typeListCheckedBeforeSend.includes(responseMessage.type))
    //     {
    //         this.toBeCheckedBeforeSend = true   
    //     }
    //     else
    //     {
    //         this.toBeCheckedBeforeSend = false   
    //     }

    //     if (responseMessage.type === "feedback")
    //     {
    //         messages.push({text: responseMessage.outputMessage, from: "MAX", type: "userFeedback", options: [], messageId: 0})
    //     }
    //     else if (responseMessage.type === "radio")
    //     {
    //         if (responseMessage.outputMessage != undefined && responseMessage.outputMessage != "")
    //         {
    //             messages.push({text: responseMessage.outputMessage, from: "MAX", type: "", options: [], messageId: 0})
    //         }

    //         messages.push({text: responseMessage.outputMessage, from: "MAX", type: "radio", options: responseMessage.options, messageId: 0})
    //     }
    //     else if (responseMessage.type === "rating")
    //     {
    //         messages.push({text: responseMessage.outputMessage, from: "MAX", type: "rating", options: [], messageId: 0})
    //     }
    //     else if (responseMessage.type === "Date")
    //     {
    //         messages.push({text: responseMessage.outputMessage, from: "User", type: "Date", options: [], messageId: 0})
    //     }
    //     else if (responseMessage.type === "Barcode")
    //     {
    //         messages.push({text: responseMessage.outputMessage, from: "User", type: "Barcode", options: [], messageId: 0})
    //     }
    //     else
    //     {
    //         messages.push({text: responseMessage.outputMessage, from: "MAX", type: "", options: [], messageId: 0})
    //     }

    //     return messages
    // }

    // mockSendMessage = (userInputMessage) => {
        
    //     alert (this.baseUrl)
    //     alert (this.context)
    //         var message = {
    //                       type: '',
    //                       outputMessage: "Sorry unable to process your query, we will contact you shortly!"  
    //                     }

    //         if (userInputMessage === "Hello" || userInputMessage === "hello" ||userInputMessage === "Hi" ||userInputMessage === "hi")
    //         {
    //             message = {
    //                 type: '',
    //                 outputMessage: "Hello from MAX!"  
    //               }
    //         }
    //         else if (userInputMessage.includes("ption"))
    //         {
    //             message = {
    //                 type: "radio",
    //                 options: ["By Budget", "By Brand" ]
    //             };
    //         }
    //         else if (userInputMessage.includes("UserRatings:"))
    //         {
    //             message = {
    //                 outputMessage: "Would you like to leave the comment for your feedback?",
    //                 type: "radio",
    //                 options: ["Yes", "No" ]
    //             };
    //         }
    //         else if (userInputMessage === "FeedBackYes")
    //         {
    //             message = {
    //                 outputMessage: "Thanks for providing the comments",
    //                 type: ""
    //             };
    //         }
    //         else if (userInputMessage === "Speech Recognized")
    //         {
    //             message = {
    //                 outputMessage: "I am Listnening",
    //                 type: ""
    //             };
    //         }
    //         else if (userInputMessage.includes("rating") || userInputMessage.includes("Rating") || userInputMessage.includes("Rate") || userInputMessage.includes("rate")) 
    //         {
    //             message = {
    //                 type: "rating"
    //             };
    //         }
    //         else if (userInputMessage === "By Budget" || userInputMessage === "By Brand")
    //         {
    //             message = {
    //                 outputMessage: "We have 4 brands which one would you like to go for?",
    //                 type: "radio",
    //                 options: [ "Ford", "Maruti", "Mahindra", "Hyundai" ]
    //             };
    //         }
    //         else if (userInputMessage === "Ford" || userInputMessage  === "Maruti" || userInputMessage === "Mahindra" || userInputMessage === "Hyundai")
    //         {
    //             message = {
    //                 type: "feedback"
    //             };
    //         }
    //         else if (userInputMessage === "Nice")
    //         {
    //             message = {
    //                 type: "",
    //                 outputMessage: "We are glad that we are able to stand upto your expectation."
    //             };
    //         }
    //         else if (userInputMessage === "Normal")
    //         {
    //             message = {
    //                 type: "",
    //                 outputMessage: "Your comment will be very valuable to improve"
    //             };
    //         }
    //         else if (userInputMessage === "Bad")
    //         {
    //             message = {
    //                 type: "",
    //                 outputMessage: "Sorry for the inconvenience, could you please tell us what went wrong"
    //             };
    //         }else if ((userInputMessage.includes("Date") || userInputMessage.includes("date")))
    //         {
    //             message = {
    //                 type: "Date" 
    //              };
    //         }
    //         else if ((userInputMessage.includes("Barcode") || userInputMessage.includes("barcode")))
    //         {                 
    //             message = {
    //                 type: "Barcode" 
    //              };
    //         } 
    //         return message
    // }

    getMaxMessages = (responseMessage) => {
        //  console.log(responseMessage)
          //return responseMessage.ConversationID
          var messages = []
          var type = ""
          var options = []
          this.toBeCheckedBeforeSend = false
          console.log(responseMessage[0])
          console.log(responseMessage[0].Message)
          if (responseMessage[0].Controls == undefined || responseMessage[0].Controls.length ==0)
          {
              messages.push({ text: responseMessage[0].Message.Message, from: "MAX", type: type, options: options, messageId: 0 })
          }
          else if (responseMessage[0].Controls[0].Type == "Select")
          {
              this.toBeCheckedBeforeSend = true
              type = "radio"
              options = responseMessage[0].Controls[0].Data
              messages.push({ text: responseMessage[0].Message.Message, from: "MAX", type: "", options: [], messageId: 0 })
              messages.push({ text: responseMessage[0].Message.Message, from: "MAX", type: type, options: options, messageId: 0 })
          }
          else if (responseMessage[0].Controls[0].Type == "DatePicker")
          {
              this.toBeCheckedBeforeSend = true
              type = "Date"
              messages.push({ text: responseMessage[0].Message.Message, from: "MAX", type: "", options: [], messageId: 0 })
              messages.push({ text: responseMessage[0].Message.Message, from: "MAX", type: type, options: options, messageId: 0 })
          }
          else if (responseMessage[0].Controls[0].Type == "Barcode") {
              this.toBeCheckedBeforeSend = true
              type = "Barcode"
              messages.push({ text: responseMessage[0].Message.Message, from: "MAX", type: type, options: [], messageId: 0 })
          }
          else if (responseMessage[0].Controls[0].Type == "Rating") {
            this.toBeCheckedBeforeSend = true
            type = "rating"
            messages.push({ text: responseMessage[0].Message.Message, from: "MAX", type: type, options: [], messageId: 0 })
          }
          else if (responseMessage[0].Control[0].type == "Feedback") {
            this.toBeCheckedBeforeSend = true
            type = "userFeedback"
            messages.push({ text: responseMessage[0].Message.Message, from: "MAX", type: type, options: [], messageId: 0 })
          }
  
          // if (responseMessage.Response.contains("feedback")) {
          //     messages.push({ text: responseMessage.outputMessage, from: "MAX", type: "userFeedback", options: [], messageId: 0 })
          // }
          // else if (responseMessage.type === "radio") {
          //     if (responseMessage.outputMessage != undefined && responseMessage.outputMessage != "") {
          //         messages.push({ text: responseMessage.outputMessage, from: "MAX", type: "", options: [], messageId: 0 })
          //     }
  
          //     messages.push({ text: responseMessage.outputMessage, from: "MAX", type: "radio", options: responseMessage.options, messageId: 0 })
          // }
          // else if (responseMessage.type === "rating") {
          //     messages.push({ text: responseMessage.outputMessage, from: "MAX", type: "rating", options: [], messageId: 0 })
          // }
          // else if (responseMessage.type === "Date") {
          //     messages.push({ text: responseMessage.outputMessage, from: "User", type: "Date", options: [], messageId: 0 })
          // }
          // else if (responseMessage.type === "Barcode") {
          //     messages.push({ text: responseMessage.outputMessage, from: "User", type: "Barcode", options: [], messageId: 0 })
          // }
          // else {
          //     messages.push({ text: responseMessage.outputMessage, from: "MAX", type: "", options: [], messageId: 0 })
          // }
  
          return messages
      }

    getToBeCheckedBeforeSendingValue = () => {
        return this.toBeCheckedBeforeSend;
    }
 
    setPicture = (picture) => {
        this.lastPicture = picture;
    }

    setDate = (date) => {
        this.lastSentDate = date;
    }

    setBarcode = (code) => {
        this.barcode = code;
    }

    getMaxMessageForBarcode = () => {
        var messages = []
        var completeText = "Barcode is scanned: " + this.barcode
        messages.push({text: completeText, from: "MAX", type: "", options: [], messageId: 0})

        return messages
    }

    getMaxMessageForDate = () => {
        var messages = []
        var completeText = "Your appointment is booked on: " + this.lastSentDate
        messages.push({text: completeText, from: "MAX", type: "", options: [], messageId: 0})

        return messages
    }

    getMaxMessageForPicture = () => {
        var messages = []
        messages.push({text: this.lastPicture, from: "MAX", type: "image", options: [], messageId: 0})

        return messages
    }

    async getApiData(userInputMessage) {
        var url = this.baseUrl + "/api/v1/MaxStateMachine/ConverseAsync";
        return fetch(url,{
            method: 'POST',
            body: JSON.stringify(
                {
                    "MessageDisplayedOnUI": userInputMessage,
                    "MessageToProcess": userInputMessage,
                    "UserName": "MaxMobile",
                    "Email": "MaxMobile@socgen.com",
                    "LoginId": "MaxMobile@socgen.com",
                    "TimeStamp":"2019-09-24T09:17:32.642Z",
                    "SelectedFilter": "string"
                  }
            ),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json-patch+json',

              }
             }, {mode: 'no-cors'}).catch(function (error) {
       console.log("-------- error ------- "+error);
       alert("result:"+error)
       });
     }

}

const chatService = new ChatService();
export default chatService;
