import React from 'react';
import { Unlock, Home, Phone, UploadCloud } from 'react-feather';

const About: React.FC = () => {
  return (

    <section className="relative pt-16 bg-blueGray-50">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg from-purple-400 via-pink-400 to-blue-500 bg-gradient-to-br">
              <img alt="..." src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=700&amp;q=80" className="w-full align-middle rounded-t-lg" />
              <blockquote className="relative p-8 mb-4">
                <h3 className="text-xl font-bold text-white">
                  What is CatchNotes?
                </h3>
                <p className="text-md font-light mt-2 text-white">
                  CatchNotes is future project that can be usefull for students and teachers by sharing their notes.
                </p>
              </blockquote>
            </div>
          </div>

          <div className="w-full md:w-6/12 px-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 px-4">
                <div className="relative flex flex-col mt-4">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-purple-300">
                      <Unlock />
                    </div>
                    <h3 className="text-xl mb-1 font-semibold">Unlimited Notes</h3>
                    <p className="mb-4 text-blueGray-500">
                      You are free to create as many notes as you can. 😎
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-pink-300">
                      <Phone />
                    </div>
                    <h3 className="text-xl mb-1 font-semibold">
                      Contact
                    </h3>
                    <p className="mb-4 text-blueGray-500">
                      You can contact with us using this e-mail: CatchNotes@example.com 😁
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 mt-4">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-yellow-300">
                      <UploadCloud />
                    </div>
                    <h3 className="text-xl mb-1 font-semibold">Updates</h3>
                    <p className="mb-4 text-blueGray-500">
                      We are still working on this site. Check our site frequently for new updates. 😀
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-300">
                      <Home />
                    </div>
                    <h3 className="text-xl mb-1 font-semibold">Team</h3>
                    <p className="mb-4 text-blueGray-500">
                      Built by students from Klucze, Olkusz, Sułoszowa. 😉
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
