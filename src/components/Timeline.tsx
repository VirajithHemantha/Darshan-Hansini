import React from 'react';
import { motion } from 'motion/react';
import { 
  Coffee, 
  Sparkles, 
  Flame, 
  FileText, 
  Heart, 
  Cake, 
  Camera, 
  PartyPopper, 
  Users, 
  Utensils 
} from 'lucide-react';

const events = [
  { 
    time: '9:00 AM – 9:15 AM', 
    title: 'Guest Arrival & Welcome Refreshments', 
    icon: Coffee, 
    desc: 'Welcoming family and friends with fresh refreshments as they arrive.' 
  },
  { 
    time: '9:15 AM – 9:20 AM', 
    title: 'Couple Entrance', 
    icon: Sparkles, 
    desc: 'Welcoming the bride and groom as they make their grand entrance.' 
  },
  { 
    time: '9:20 AM – 9.40 AM', 
    title: 'Lighting of the Traditional Oil Lamp & Welcome Address', 
    icon: Flame, 
    desc: 'An auspicious start with the lighting of the lamp and opening address.' 
  },
  { 
    time: '9.40 AM – 10.00 AM', 
    title: 'Marriage Registration & Signing', 
    icon: FileText, 
    desc: 'Official signing of the wedding registry and marriage documents.' 
  },
  { 
    time: '10.00 AM – 10.20 AM', 
    title: 'Exchange of Rings', 
    icon: Heart, 
    desc: 'The couples exchange rings and solemnize their vows.' 
  },
  { 
    time: '10.20 AM – 10.35 AM', 
    title: 'Wedding Cake Cutting Ceremony', 
    icon: Cake, 
    desc: 'Sweet celebration as the couple cuts their wedding cake together.' 
  },
  { 
    time: '10.35 AM – 11.15 AM', 
    title: 'Family & Group Photo Session', 
    icon: Camera, 
    desc: 'Capturing memories with family and group photography sessions.' 
  },
  { 
    time: '11.15 AM – 11.30 AM', 
    title: 'Family Blessings & Toast', 
    icon: PartyPopper, 
    desc: 'Receiving blessings from the elders and celebrating with a wedding toast.' 
  },
  { 
    time: '11.30 AM – 12.00 PM', 
    title: 'Guest Interaction & Photos', 
    icon: Users, 
    desc: 'Mingle with guests and capture beautiful individual and group shots.' 
  },
  { 
    time: '12.00 PM - 4.00 PM', 
    title: 'Lunch Buffet & DJ Event', 
    icon: Utensils, 
    desc: 'A festive buffet spread followed by music, dancing, and celebration.' 
  },
];


export const Timeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-20">
        <span className="text-brand-beige-deep uppercase tracking-[0.4em] text-[10px] font-medium mb-4 block">
          The Day's Flow
        </span>
        <h2 className="text-5xl font-display text-stone-800 tracking-tight">Wedding Timeline</h2>
        <div className="w-12 h-px bg-brand-beige/30 mx-auto mt-6" />
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-beige/20 to-transparent" />

        <div className="space-y-24">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Time */}
              <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <span className="text-2xl font-serif text-brand-beige-deep italic">{event.time}</span>
              </div>

              {/* Icon Node */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-white border border-brand-beige/30 flex items-center justify-center shadow-xl">
                <event.icon className="w-5 h-5 text-brand-beige-deep" />
              </div>

              {/* Content */}
              <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <h4 className="text-xl font-display text-stone-800 mb-1">{event.title}</h4>
                <p className="text-stone-400 text-sm leading-relaxed">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
