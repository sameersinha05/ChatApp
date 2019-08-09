class ChatService{
    constructor(){

        this.lastPicture = null
        this.typeListCheckedBeforeSend = ["radio", "rating", "feedback"]
        this.toBeCheckedBeforeSend = false
        this.lastSentDate = null
    }

    getInitialDefaultMaxMessages = () => {
        var messages = [{text: 'Hi, I am MAX! Welcome.', from:'MAX', type:'', options:[]}]
        messages.push({text: "I am your personal assistant, I will help you place small and bulk orders of vehicle at any time.", from: "MAX", type:'', options:[]});
        messages.push({text: "Here a few things you can do with me: \n Type \" Restart\" to start the conversaton. \n Type \" Find Cheaper\" to find a cheaper car offer. \nType \"Help\" to see contextual help and help menu.", from: "MAX", from: "MAX", type:'', options:[]});
        return messages        
    }
        
    getMaxMessages = (responseMessage) => {
        var messages = []
        if (this.typeListCheckedBeforeSend.includes(responseMessage.type))
        {
            this.toBeCheckedBeforeSend = true   
        }
        else
        {
            this.toBeCheckedBeforeSend = false   
        }

        if (responseMessage.type === "feedback")
        {
            messages.push({text: responseMessage.outputMessage, from: "MAX", type: "userFeedback", options: [], messageId: 0})
        }
        else if (responseMessage.type === "radio")
        {
            if (responseMessage.outputMessage != undefined && responseMessage.outputMessage != "")
            {
                messages.push({text: responseMessage.outputMessage, from: "MAX", type: "", options: [], messageId: 0})
            }

            messages.push({text: responseMessage.outputMessage, from: "MAX", type: "radio", options: responseMessage.options, messageId: 0})
        }
        else if (responseMessage.type === "rating")
        {
            messages.push({text: responseMessage.outputMessage, from: "MAX", type: "rating", options: [], messageId: 0})
        }
        else if (responseMessage.type === "Date")
        {
            messages.push({text: responseMessage.outputMessage, from: "User", type: "Date", options: [], messageId: 0})
        }
        else
        {
            messages.push({text: responseMessage.outputMessage, from: "MAX", type: "", options: [], messageId: 0})
        }

        return messages
    }

    mockSendMessage = (userInputMessage) => {
            var message = {
                          type: '',
                          outputMessage: "Sorry unable to process your query, we will contact you shortly!"  
                        }

            if (userInputMessage === "Hello" || userInputMessage === "hello" ||userInputMessage === "Hi" ||userInputMessage === "hi")
            {
                message = {
                    type: '',
                    outputMessage: "Hello from MAX!"  
                  }
            }
            else if (userInputMessage.includes("ption"))
            {
                message = {
                    type: "radio",
                    options: ["By Budget", "By Brand" ]
                };
            }
            else if (userInputMessage.includes("UserRatings:"))
            {
                message = {
                    outputMessage: "Would you like to leave the comment for your feedback?",
                    type: "radio",
                    options: ["Yes", "No" ]
                };
            }
            else if (userInputMessage === "FeedBackYes")
            {
                message = {
                    outputMessage: "Thanks for providing the comments",
                    type: ""
                };
            }
            else if (userInputMessage === "Speech Recognized")
            {
                message = {
                    outputMessage: "I am Listnening",
                    type: ""
                };
            }
            else if (userInputMessage.includes("rating") || userInputMessage.includes("Rating") || userInputMessage.includes("Rate") || userInputMessage.includes("rate")) 
            {
                message = {
                    type: "rating"
                };
            }
            else if (userInputMessage === "By Budget" || userInputMessage === "By Brand")
            {
                message = {
                    outputMessage: "We have 4 brands which one would you like to go for?",
                    type: "radio",
                    options: [ "Ford", "Maruti", "Mahindra", "Hyundai" ]
                };
            }
            else if (userInputMessage === "Ford" || userInputMessage  === "Maruti" || userInputMessage === "Mahindra" || userInputMessage === "Hyundai")
            {
                message = {
                    type: "feedback"
                };
            }
            else if (userInputMessage === "Nice")
            {
                message = {
                    type: "",
                    outputMessage: "We are glad that we are able to stand upto your expectation."
                };
            }
            else if (userInputMessage === "Normal")
            {
                message = {
                    type: "",
                    outputMessage: "Your comment will be very valuable to improve"
                };
            }
            else if (userInputMessage === "Bad")
            {
                message = {
                    type: "",
                    outputMessage: "Sorry for the inconvenience, could you please tell us what went wrong"
                };
            }else if ((userInputMessage.includes("Date") || userInputMessage.includes("date")))
            {
                message = {
                    type: "Date" 
                 };
            }

            return message
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

}

const chatService = new ChatService();
export default chatService;
