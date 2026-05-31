import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, ExternalLink, Link, Heart, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export const AdminPage: React.FC = () => {
  const [salutation, setSalutation] = useState('Mr. & Mrs.');
  const [customSalutation, setCustomSalutation] = useState('');
  const [guestName, setGuestName] = useState('');
  const [msgTemplate, setMsgTemplate] = useState('default');
  const [customMessage, setCustomMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const salutations = [
    'Mr. & Mrs.',
    'Family of',
    'Mr.',
    'Mrs.',
    'Miss',
    'Dr.',
    'Dear',
    'Custom'
  ];

  const templates = {
    default: 'Together with our families, we joyfully invite you to join us',
    blessing: 'We request the honour of your presence to bless us on our wedding day',
    celebrate: 'We can\'t wait to celebrate our special day with you! Please join us for our wedding celebration.',
    custom: ''
  };

  // Compute invite message based on selections
  const getInviteMessage = () => {
    if (msgTemplate === 'custom') {
      return customMessage;
    }
    return templates[msgTemplate as keyof typeof templates] || templates.default;
  };

  // Compute final guest label (salutation + name)
  const getGuestLabel = () => {
    const activeSalutation = salutation === 'Custom' ? customSalutation : salutation;
    if (!guestName) return '';
    return activeSalutation ? `${activeSalutation} ${guestName}` : guestName;
  };

  // Automatically update generated link
  useEffect(() => {
    const label = getGuestLabel();
    const message = getInviteMessage();
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/admin(\/)?$/, '');
    
    const params = new URLSearchParams();
    if (label) params.append('to', label);
    if (message && message !== templates.default) params.append('msg', message);
    
    const queryString = params.toString();
    setGeneratedLink(queryString ? `${baseUrl}?${queryString}` : baseUrl);
    setCopied(false);
  }, [salutation, customSalutation, guestName, msgTemplate, customMessage]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      toast.success('Personalized invitation link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error('Could not copy link automatically.');
    }
  };

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-ivory via-white to-brand-champagne/30">
      {/* Premium backdrop glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-beige/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Decorative watercolor corner */}
      <img src="/sage_green_flowers.png" className="absolute top-0 left-0 w-36 sm:w-48 opacity-25 pointer-events-none mix-blend-multiply select-none" alt="" />
      <img src="/sage_green_flowers.png" className="absolute bottom-0 right-0 w-36 sm:w-48 opacity-25 pointer-events-none mix-blend-multiply select-none rotate-180" alt="" />

      <div className="max-w-4xl mx-auto">
        
        {/* Title Header */}
        <div className="text-center mb-12 relative">
          <Heart className="w-8 h-8 mx-auto mb-4 text-brand-beige-deep fill-brand-beige/25" />
          <span className="text-brand-beige-deep uppercase tracking-[0.4em] text-[10px] font-bold block mb-2">
            Wedding Administrator
          </span>
          <h1 className="text-4xl sm:text-5xl font-display text-stone-800 tracking-tight drop-shadow-sm">
            Invitation Link <span className="italic font-light text-brand-beige-deep">Generator</span>
          </h1>
          <p className="mt-3 text-stone-500 font-serif italic text-base sm:text-lg">
            Create custom personalized web links to send to your guests.
          </p>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-brand-beige/60 to-transparent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Link Generator Form Box (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass bg-white/60 backdrop-blur-3xl border border-white/80 p-6 sm:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-beige via-brand-beige-deep to-brand-beige" />
              
              <h2 className="text-lg uppercase tracking-wider font-bold text-stone-700 mb-6 flex items-center gap-2">
                <Link className="w-4 h-4 text-brand-beige-deep" />
                Guest Details Builder
              </h2>

              <div className="space-y-5">
                
                {/* Salutation selection */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-stone-500 mb-2 ml-1">
                    Salutation
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      value={salutation}
                      onChange={(e) => setSalutation(e.target.value)}
                      className="w-full bg-white/80 px-4 py-3 rounded-full border border-stone-200/60 focus:ring-2 focus:ring-brand-beige/35 focus:border-brand-beige-deep/40 outline-none transition-all duration-300 font-serif italic text-base text-stone-700 cursor-pointer"
                    >
                      {salutations.map((sal) => (
                        <option key={sal} value={sal}>{sal}</option>
                      ))}
                    </select>

                    {salutation === 'Custom' && (
                      <input
                        required
                        type="text"
                        placeholder="E.g., Dearest"
                        value={customSalutation}
                        onChange={(e) => setCustomSalutation(e.target.value)}
                        className="w-full bg-white/80 px-4 py-3 rounded-full border border-stone-200/60 focus:ring-2 focus:ring-brand-beige/35 focus:border-brand-beige-deep/40 outline-none transition-all duration-300 font-serif italic text-base text-stone-700 placeholder:text-stone-300"
                      />
                    )}
                  </div>
                </div>

                {/* Guest Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-stone-500 mb-2 ml-1">
                    Guest Name
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., John Doe"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-white/85 px-5 py-3 rounded-full border border-stone-200/60 focus:ring-2 focus:ring-brand-beige/35 focus:border-brand-beige-deep/40 outline-none transition-all duration-300 font-serif italic text-base text-stone-700 placeholder:text-stone-300 shadow-inner"
                  />
                </div>

                {/* Message Preset Selector */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-stone-500 mb-2 ml-1">
                    Invitation Message Template
                  </label>
                  <select
                    value={msgTemplate}
                    onChange={(e) => setMsgTemplate(e.target.value)}
                    className="w-full bg-white/80 px-4 py-3 rounded-full border border-stone-200/60 focus:ring-2 focus:ring-brand-beige/35 focus:border-brand-beige-deep/40 outline-none transition-all duration-300 font-serif italic text-base text-stone-700 cursor-pointer"
                  >
                    <option value="default">Default Message</option>
                    <option value="blessing">Formal Wedding Request</option>
                    <option value="celebrate">Close Friends / Enthusiastic</option>
                    <option value="custom">Custom Message...</option>
                  </select>
                </div>

                {/* Custom Message Text Area */}
                {msgTemplate === 'custom' && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-stone-500 mb-2 ml-1">
                      Custom Message
                    </label>
                    <textarea
                      placeholder="Type your personalized message here..."
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      className="w-full bg-white/80 px-5 py-3 rounded-2xl border border-stone-200/60 focus:ring-2 focus:ring-brand-beige/35 focus:border-brand-beige-deep/40 outline-none transition-all duration-300 h-24 resize-none font-serif italic text-base text-stone-700 placeholder:text-stone-300"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Generated Link Panel */}
            <div className="glass bg-stone-900 border border-stone-800 p-6 sm:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden text-white">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-beige-deep via-brand-gold to-brand-beige-deep" />
              
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-champagne mb-4">
                Personalized Link
              </h2>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="w-full bg-stone-800/80 text-stone-300 px-4 py-3 rounded-full border border-stone-700/60 font-sans text-xs outline-none select-all overflow-ellipsis"
                />
                
                <div className="flex w-full sm:w-auto gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex-1 sm:flex-none bg-brand-beige-deep hover:bg-brand-beige text-stone-900 px-5 py-3 rounded-full font-sans text-[10px] uppercase font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Link
                      </>
                    )}
                  </button>

                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-stone-800 hover:bg-stone-700 text-brand-champagne border border-stone-700 p-3 rounded-full transition-all duration-300 flex items-center justify-center"
                    title="Open Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Experience Live Preview Box (5 cols) */}
          <div className="lg:col-span-5">
            <div className="glass bg-white/40 border border-white/60 p-6 sm:p-8 rounded-[2rem] shadow-lg relative overflow-hidden">
              <h2 className="text-lg uppercase tracking-wider font-bold text-stone-700 mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                Invitation Preview
              </h2>

              {/* Envelope Card Mockup */}
              <div className="bg-gradient-to-br from-white/95 to-stone-50 border border-stone-200/80 rounded-2xl p-5 shadow-md mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-beige/50" />
                <span className="text-[8px] uppercase tracking-[0.2em] font-sans font-bold text-stone-400 block mb-3">Envelope Card View</span>
                
                <div className="border border-brand-beige/30 p-4 rounded-lg text-center bg-white">
                  {getGuestLabel() ? (
                    <div className="mb-4">
                      <span className="text-stone-400 font-serif italic text-[10px] tracking-wider block mb-1">Specially Invited</span>
                      <span className="text-stone-850 font-display text-lg block border-b border-brand-beige/25 pb-1 max-w-[200px] mx-auto overflow-hidden text-ellipsis whitespace-nowrap">
                        {getGuestLabel()}
                      </span>
                    </div>
                  ) : (
                    <div className="mb-4 opacity-35">
                      <span className="text-stone-400 font-serif italic text-[10px] tracking-wider block mb-1">Specially Invited</span>
                      <span className="text-stone-800 font-display text-lg block border-b border-brand-beige/25 pb-1 max-w-[200px] mx-auto italic">Guest Name Here</span>
                    </div>
                  )}

                  <span className="text-[8px] uppercase tracking-[0.1em] font-sans text-stone-400">Request the honour of your presence...</span>
                </div>
              </div>

              {/* Hero Section Invite Text Mockup */}
              <div className="bg-stone-800 border border-stone-700 rounded-2xl p-5 shadow-md relative overflow-hidden text-stone-100">
                <span className="text-[8px] uppercase tracking-[0.2em] font-sans font-bold text-stone-500 block mb-3">Hero Section View</span>
                
                <div className="text-center py-2 px-1">
                  {getGuestLabel() ? (
                    <div className="mb-4">
                      <span className="text-brand-champagne/60 font-sans uppercase tracking-[0.25em] text-[9px] block mb-1">Specially Invited</span>
                      <span className="text-brand-champagne font-serif italic text-xl font-semibold">{getGuestLabel()}</span>
                    </div>
                  ) : null}

                  <div className="text-stone-300 font-serif italic text-xs leading-relaxed max-w-xs mx-auto border-t border-stone-700/50 pt-3">
                    "{getInviteMessage()}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
