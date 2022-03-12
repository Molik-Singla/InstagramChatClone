module.exports = {
    content: ["*"],
    // content: ["*"],
    theme: {
        screens: {
            lg: { max: "1023px" },
            // => @media (max-width: 1023px) { ... }

            md: { max: "767px" },
            // => @media (max-width: 767px) { ... }

            sm: { max: "639px" },
            // => @media (max-width: 639px) { ... }
        },
        extend: {
            fontFamily: {
                primary: ['-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;'],
            },
            colors: {
                "primary-grey": "rgb(250,250,250)",
                "btn-color": "rgb(0,149,246)",
                "border-color": "rgb(210,210,210)]",
                "dark-border-color": "rgb(209 ,213 ,219)",
                "message-background-gray": "rgb(239,239,239)",
                "hover-grey": "rgb(247,247,247)",
            },
        },
    },
    plugins: [],
};
