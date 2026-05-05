import React, { useState } from 'react';
import { FaCircleUser  } from "react-icons/fa6";


import { 
  Search,
  HelpCircle,
  Book,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Mail,
  Phone,
  Clock
} from 'lucide-react';


export function HelpAndSuppot() {
  const AssistanceStaff = [
    {
      id:1,
      name:'Lameck John',
      position:'Programer',
      email:'lameckjohn@gmail.com',
      contact:'+255 756 427 543'
    },
    {
      id:2,
      name:'Lohn Berror',
      position:'Developer',
      email:'johnberror@gmail.com',
      contact:'+255 688 567 234'
    },
    {
      id:3,
      name:'Joctan Deus',
      position:'Developer',
      email:'joctandeous@gmail.com',
      contact:'+255 683 307 420'
    },
    // {
    //   id:4,
    //   name:'Joctan Deus',
    //   position:'Developer',
    //   email:'joctandeous@gmail.com',
    //   contact:'+255 683 307 420'
    // }
  ]


  return (
    <div className='flex flex-col h-full w-full px-16'>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  w-full self-center top-24 gap-4">

      {/* cards start here */}
        

          {
            AssistanceStaff.map((stuf,index)=>(
              <div className='flex flex-col bg-white h-full rounded-md w-52 hover:translate-y-2 transition-all duration-1000 cursor-pointer'>

              <div className='flex bg-white w-full  rounded-t-md  '>
                <div className='flex justify-center items-center w-full bg-blue-400 p-4 rounded-t-md rounded-bl-3xl'>
                  <div className='h-[80px] w-[80px] flex justify-center items-center border border-gray-100 bg-blue-300 p-1 rounded-full'> <FaCircleUser size={80} color='#f0f0f0'/></div>
                </div>
              </div>
              <div className='flex bg-blue-400 w-full flex-grow rounded-b-md shadow-2xl'>
                <div className='flex flex-col justify-center items-center bg-white  flex-grow rounded-tr-3xl rounded-b-md'>
                  <div>
                    <h3 className='font-serif font-semibold py-2 text-blue-300'>{stuf.position}</h3>
                  </div>
                  <div className='px-2 w-full flex flex-col justify-center items-center font-serif'>
                    <small className='font-serif font-semibold text-gray-400 py-1'>{stuf.name} , i am here to </small>
                    <small className='font-serif font-semibold text-gray-400 py-1'>assist you for any problem </small>
                    <small className='font-serif font-semibold text-gray-400 pb-1'>arise in HSSEQ System</small>
                  </div>

                  <div className='flex py-1 flex-col justify-center w-full items-center bg-gradient-to-br from-indigo-300 to-teal-300 rounded-t-xl rounded-b-md'>
                    <small className='text-white font-semibold'>{stuf.contact}</small>
                    <small className='text-white font-semibold'>{stuf.email}</small>
                  </div>

                </div>
              </div>
          </div>

            ))
          }

          {/* card end here */}
      </div>

      <div className='h-24 text-gray-200'>
        {/* height divider */}
      </div>

      
      <div className='grid grid-cols-1 
                              bg-gradient-to-tr bg-white p-4  rounded-lg w-full'>

                                <span className='text-blue-500 font-serif font-bold'>
                                  General descriptions for all help and support teams
                                </span>

      </div>
    </div>
  )
}










export function HelpAndSupport() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. You\'ll receive an email with instructions to create a new password.'
    },
    {
      id: 2,
      question: 'How can I manage user permissions?',
      answer: 'Navigate to Settings > User Management. From there, you can assign roles and customize permissions for each user or user group.'
    },
    {
      id: 3,
      question: 'What file types are supported for uploads?',
      answer: 'Our CMS supports various file types including images (JPG, PNG, GIF, WebP), documents (PDF, DOC, DOCX), and media files (MP4, MP3).'
    },
    // {
    //   id: 4,
    //   question: 'How do I schedule content publication?',
    //   answer: 'When creating or editing content, look for the "Schedule" option in the publishing menu. You can set a specific date and time for your content to go live.'
    // }
  ];

  const quickLinks = [
    {
      title: 'Getting Started Guide',
      icon: Book,
      description: 'Learn the basics of our CMS',
      link: '#'
    },
    {
      title: 'Video Tutorials',
      icon: MessageSquare,
      description: 'Step-by-step visual guides',
      link: '#'
    },
    {
      title: 'API Documentation',
      icon: HelpCircle,
      description: 'Technical documentation and APIs',
      link: '#'
    }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-sky-500 p-2">


      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="mt-2 text-gray-600">Find answers, documentation, and support resources</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for help articles..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>


      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.link}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <link.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{link.title}</h3>
                  <p className="mt-1 text-gray-600">{link.description}</p>
                  <div className="mt-2 flex items-center text-blue-600">
                    <span className="text-sm">Learn more</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>


      {/* FAQs */}
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => toggleFaq(faq.id)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {expandedFaq === faq.id ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {expandedFaq === faq.id && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Support</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Email Support</h3>
                <p className="mt-1 text-gray-600">support@example.com</p>
                <p className="mt-1 text-sm text-gray-500">24/7 support for urgent issues</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Phone Support</h3>
                <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
                <p className="mt-1 text-sm text-gray-500">Available during business hours</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Clock className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Business Hours</h3>
                <p className="mt-1 text-gray-600">Mon-Fri: 9AM - 6PM EST</p>
                <p className="mt-1 text-sm text-gray-500">Weekend: Email support only</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      


    </div>
  );
}

