import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
  


interface FAQProps {
    question: string;
    answer: string;
    value: string;
}   



const FAQList: FAQProps[] = [
    {
      question: "Is it free to create an account?",
      answer: "As long as you own a unit within Grand Cedar Homes and is an actively paying member of its homeowners association (HOA), you have the rights to have a free account.",
      value: "item-1",
    },
    {
      question: "How do I create an account?",
      answer:
        "Accounts are created by the officers of the HOA, the admins of the website. Contact them and tell them your block and lot number and they'll give you temporary account credentials. You can use these credentials to access your account and change your password.",
      value: "item-2",
    },
    {
      question:
        "I forgot my account credentials. How can I access my account?",
      answer:
        "Contact the officers of the HOA, the admins of the website. They will reset your account credentials and give it to you. You can use your new credentials to access your account.",
      value: "item-3",
    },
];
  


export const FAQ = () => {



    return (
        
        <section
            id="faq"
            className="container py-24 sm:py-32"
        >

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked{" "}
                
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    Questions
                </span>
            </h2>
    
            <Accordion
                type="single"
                collapsible
                className="w-full AccordionRoot"
            >
            {FAQList.map(({ question, answer, value }: FAQProps) => (
                <AccordionItem
                key={value}
                value={value}
                >
                <AccordionTrigger className="text-left">
                    {question}
                </AccordionTrigger>
    
                <AccordionContent>{answer}</AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
    
            <h3 className="font-medium mt-4">
                Still have questions?{" "}
                <a
                    rel="noreferrer noopener"
                    href="#contact"
                    className="text-primary transition-all border-primary hover:border-b-2"
                >
                    Contact us
                </a>
            </h3>

        </section>

    );
  };