// const {Configuration, OpenAIApi} = require('openai');
// const configuration = new Configuration({apiKey: "sk-proj-RUOpZ711He4tlMhBvw0JT3BlbkFJ4xzDw8Vlfc2fYU3JuzFw"});
// const openai = new OpenAIApi(configuration);


const OpenAI = require('openai');

const openai = new OpenAI({ 
apiKey: "sk-proj-RUOpZ711He4tlMhBvw0JT3BlbkFJ4xzDw8Vlfc2fYU3JuzFw", dangerouslyAllowBrowser: true });

export async function sendMsgToOpenAI(message){
    const res = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: message,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });
    return res.data.choices[0].text;
    // const res = await openai.createCompletion({
    //     model: 'text-davinci-003',
    //     prompt: message,
    //     temperature: 0.7,
    //     max_tokens: 256,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0
    // });
    // return res.data.choices[0].text;
}
