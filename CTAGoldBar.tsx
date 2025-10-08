import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';

interface ButtonConfig {
  text: string;
  href: string;
  style: 'outline' | 'filled';
}

interface CTAGoldBarProps {
  leftText?: string;
  buttons?: ButtonConfig[];
  
  // Legacy props for backward compatibility
  onSecondaryClick?: () => void;
  onPrimaryClick?: () => void;
  secondaryText?: string;
  primaryText?: string;
  heading?: string;
}

export function CTAGoldBar({ 
  leftText,
  buttons,
  // Legacy props
  onSecondaryClick,
  onPrimaryClick,
  secondaryText = "Learn More",
  primaryText = "Get Started",
  heading = "Ready to discuss your business?"
}: CTAGoldBarProps) {
  // Use new format if provided, otherwise fall back to legacy
  const displayText = leftText || heading;
  const displayButtons = buttons || [
    { text: secondaryText, href: "#projects", style: "outline" as const },
    { text: primaryText, href: "#contact", style: "filled" as const }
  ];

  return (
    <div 
      className="goldbar-cta flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8 rounded-2xl px-7 py-5 bg-brand-accent-gold"
    >
      {/* Left: Marcellus SC heading - 32px crisp vector text */}
      <div className="flex-1">
        <h2 
          className="start-project font-marcellus text-brand-primary"
          style={{ 
            fontFamily: "'Marcellus SC', serif",
            fontWeight: "400", /* Regular - match hero white headline */
            fontSize: "32px", /* Updated to 32px as requested */
            letterSpacing: "0.3px", /* +0.3px exact */
            lineHeight: "1", /* 100% = 32px */
            WebkitFontSmoothing: "antialiased", /* Standard anti-aliasing */
            MozOsxFontSmoothing: "grayscale",
            textRendering: "geometricPrecision", /* Crisp vector text */
            textShadow: "none", /* No drop shadow */
            filter: "none", /* No blur */
            textTransform: "none", /* Manual title case */
            fontStyle: "normal"
          }}
        >
          {displayText}
        </h2>
      </div>
      
      {/* Right: Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
        {displayButtons.map((button, index) => (
          <Button
            key={index}
            asChild
            variant={button.style === 'outline' ? 'outline' : 'default'}
            type="button"
            className={`rounded-xl transition-all ${ 
              button.style === 'outline' 
                ? 'bg-brand-primary text-brand-white border-2 border-brand-primary hover:border-brand-accent-gold' 
                : 'bg-brand-primary text-brand-white hover:bg-opacity-90 border-brand-primary'
            }`}
            style={{
              minWidth: '140px'
            }}
          >
            <Link href={button.href}>{button.text}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}