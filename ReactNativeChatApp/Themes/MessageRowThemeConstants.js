const MessageRowThemeConstants = {
    light: {
        unpressed: {
            color: "#3F51B5",
            backgroundColor: "#fff",
            borderColor: "#3F51B5",
        },
        pressed: {
            color: "#fff",
            backgroundColor: "#3F51B5",
            borderColor: "#3F51B5",
        },
        conversation: {
            max: {
                backgroundColor: '#E2F4F4',
                color: "#3D3D3D"
            },
            user: {
                backgroundColor: '#3F51B5',
                color: "#fff"
            }
        }
    },
    dark: {
        unpressed: {
            color: "#35C3CF",
            backgroundColor: "#303030",
            borderColor: "#35C3CF",
        },
        pressed: {
            color: "#fff",
            backgroundColor: "#35C3CF",
            borderColor: "#35C3CF",
        },
        conversation: {
            max: {
                backgroundColor: '#424242',
                color: "#fff"
            },
            user: {
                backgroundColor: '#35C3CF',
                color: "#fff"
            }
        }
    },
}


export default MessageRowThemeConstants;