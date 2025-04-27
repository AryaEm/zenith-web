import FAQItem from "./faq-items";

const FAQ = () => {
    const faqItems1 = [
        { question: "How do I contact Zenith?", answer: "You can contact us via email at support@zenith.com." },
        { question: "Purchasing and Billing", answer: "Visit our billing section to manage your subscriptions." },
        { question: "Information for new user", answer: "New users can start with our quick start guide." },
    ];

    const faqItems2 = [
        { question: "How to request a refund", answer: "You can request a refund through your account settings." },
        { question: "Can I use it offline?", answer: "Yes, our app supports offline mode for most features." },
        { question: "Family share", answer: "You can share your account with up to 5 family members." },
    ];

    return (
        <div className="h-fit pb-20 flex flex-col items-center w-full primary">
            <div className="w-4/5 mt-10">
                <h2 className="text-3xl font-bold sfprodisplay text-white tracking-wide text-center">Frequently Asked <br />Questions</h2>
            </div>

            <div className="flex w-4/5 gap-8 relative">
                <div className="w-1/2 h-fit my-10 grid grid-cols-1 md:grid gap-8">
                    {faqItems1.map((item, index) => (
                        <FAQItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>

                <div className="w-1/2 h-fit my-10 grid grid-cols-1 md:grid gap-8 ">
                    {faqItems2.map((item, index) => (
                        <FAQItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
