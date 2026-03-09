import RaffleForm from './RaffleForm';

export default function RaffleSection() {
    return (
      <section id="raffle-section" className="bg-[#00504a] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#fcd839] mb-4">
            Join the Tribe - Win $100
          </h2>
          <p className="text-lg md:text-xl mb-10">
            We are building a community of leaders.<br />
            Complete the 3 steps below to enter the raffle for a $100 Amazon Gift Card.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Step 1: Register */}
            <div className="bg-white text-black p-6 rounded-xl shadow-xl flex flex-col items-center">
              <div className="text-4xl font-bold text-[#951744] mb-3">1</div>
              <h3 className="font-bold text-xl mb-2">Register</h3>
              <p className="text-sm mb-6 flex-grow">Fill out the form below to join our official mailing list.</p>
              <a href="#raffle-form" className="bg-[#951744] text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 transition-colors">
                Fill the Form
              </a>
            </div>
  
            {/* Step 2: Instagram */}
            <div className="bg-white text-black p-6 rounded-xl shadow-xl flex flex-col items-center">
              <div className="text-4xl font-bold text-[#951744] mb-3">2</div>
              <h3 className="font-bold text-xl mb-2">Follow Us</h3>
              <p className="text-sm mb-6 flex-grow">Follow us on Instagram for authentic updates from the field.</p>
              <a href="https://www.instagram.com/aharai.america/" target="_blank" rel="noopener noreferrer" className="bg-[#951744] text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 transition-colors">
                Go to Instagram
              </a>
            </div>
  
            {/* Step 3: WhatsApp */}
            <div className="bg-white text-black p-6 rounded-xl shadow-xl flex flex-col items-center">
              <div className="text-4xl font-bold text-[#951744] mb-3">3</div>
              <h3 className="font-bold text-xl mb-2">Join the Tribe</h3>
              <p className="text-sm mb-6 flex-grow">Join our WhatsApp community for real-time connection.</p>
              <a href="https://chat.whatsapp.com/B8gP6bDnCCgAgCpad3CDDp?mode=gi_t" target="_blank" rel="noopener noreferrer" className="bg-[#951744] text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 transition-colors">
                Join WhatsApp
              </a>
            </div>
          </div>
  
          {/* The Embedded Form Area */}
          <div id="raffle-form" className="bg-white rounded-xl p-2 md:p-6 w-full max-w-2xl mx-auto shadow-2xl overflow-hidden text-black">
            <RaffleForm />
          </div>
          
          <p className="text-sm text-gray-300 mt-8 opacity-80">* Must complete all 3 steps to be eligible to win.</p>
        </div>
      </section>
    );
}