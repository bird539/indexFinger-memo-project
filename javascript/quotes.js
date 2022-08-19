const quotes = [
    {
        quote: "Sleep for a total of 800 hours per day",
        author: "prescrip",
    },
    {
        quote: "And then drink a liter of milk",
        author: "prescrip",
    },
    {
        quote: "Warm-up before you go play",
        author: "prescrip",
    },
    {
        quote: "pull the trigger with your right hand Only thing that's left",
        author: "prescrip",
    },
    {
        quote: "Is to work on following commands",
        author: "prescrip",
    },
    {
        quote: "In 30 minutes, find a groom or bride",
        author: "prescrip",
    },
    {
        quote: "In 90 hours, spill their insides Paint your room picturesque",
        author: "prescrip",
    },
    {
        quote: "Now it's time for another vendetta",
        author: "prescrip",
    },
    {
        quote: "Don't ask me why",
        author: "prescrip",
    },
    {
        quote: "Do not go home until you finish reading the value of E.",
        author: "prescrip",
    },
];
const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;

//Math모듈-random():0~1사이 숫자 랜덤으로 제공. 10을 곱해 0~10사이 숫자 얻을 수 있음.
//round():숫자를 정수만 보여줌. ceil():숫자를 천장까지 높여줌. floor():숫자를 바닥까지 내려줌.