import { motion } from 'framer-motion';
import { Award, Heart, Users, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-5xl md:text-6xl font-bold mb-4">
            Our Story
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-300 max-w-2xl mx-auto">
            Three generations of pickle-making passion, bringing authentic Andhra flavors to your table
          </motion.p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src="/images/our-story.png" alt="Our Kitchen" className="rounded-2xl shadow-large" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-4xl font-bold text-primary mb-6">From Grandma's Kitchen</h2>
            <p className="text-gray-600 text-lg mb-4">
              It all started in a small kitchen in Andhra Pradesh, where our grandmother would spend hours perfecting her pickle recipes. Using only the freshest ingredients and traditional methods passed down through generations, she created flavors that brought families together.
            </p>
            <p className="text-gray-600 text-lg">
              Today, we continue that tradition, handcrafting every jar with the same love and care. No preservatives, no shortcuts – just authentic taste that reminds you of home.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-bold text-primary mb-4">Our Values</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            What makes our pickles special isn't just the taste, but the values we hold dear
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: Heart, title: 'Made with Love', desc: 'Every jar is handcrafted with care and passion' },
            { icon: Shield, title: 'No Preservatives', desc: '100% natural ingredients, nothing artificial' },
            { icon: Award, title: 'Premium Quality', desc: 'Only the finest ingredients make it into our pickles' },
            { icon: Users, title: 'Family Tradition', desc: 'Three generations of pickle-making expertise' },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-8 text-center"
            >
              <value.icon className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold mb-4">Taste the Tradition</h2>
          <p className="text-xl text-gray-300 mb-8">Experience authentic Andhra pickles made with love</p>
          <a href="/shop" className="btn-primary inline-block">Shop Now</a>
        </div>
      </div>
    </div>
  );
};

export default About;
