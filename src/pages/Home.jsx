import HeroSection from '../components/HeroSection'
import VideoSlider from '../components/VideoSlider'
import CulturalHubPreview from '../components/CulturalHubPreview'
import Testimonials from '../components/Testimonials'
import LogoCarousel from '../components/LogoCarousel'

const affiliationLogos = [
  { name: 'Abercrombie', src: '/images/Affilations/abercrombie.jpg' },
  { name: 'Bales', src: '/images/Affilations/bales.jpg' },
  { name: 'Canada Club', src: '/images/Affilations/canada-club.png' },
  { name: 'Gateway', src: '/images/Affilations/gateway.jpeg' },
  { name: 'Kuoni', src: '/images/Affilations/kuoni.gif' },
  { name: 'Saga', src: '/images/Affilations/saga.jpg' },
  { name: 'SCO', src: '/images/Affilations/sco.jpg' },
  { name: 'Sweden Embassy', src: '/images/Affilations/sweden-embassy.jpg' },
  { name: 'Thompsons', src: '/images/Affilations/thompsons.jpeg' },
  { name: 'Partner', src: '/images/Affilations/unnamed.png' },
  { name: 'Wonders', src: '/images/Affilations/wonders.png' },
]

const accreditationLogos = [
  { name: 'ACTP', src: '/images/Acreditations/actp.jpg' },
  { name: 'Barton', src: '/images/Acreditations/barton.jpg' },
  { name: 'Culture Active', src: '/images/Acreditations/culture-active.png' },
  { name: 'Helwan University', src: '/images/Acreditations/helwan-uni.png' },
  { name: 'ICF', src: '/images/Acreditations/icf.png' },
  { name: 'Lewis Model', src: '/images/Acreditations/lewis-model.png' },
  { name: 'Stanford', src: '/images/Acreditations/stanford-cardinal.jpg' },
  { name: 'SUMAS', src: '/images/Acreditations/sumas.jpg' },
  { name: 'UN Compact', src: '/images/Acreditations/un-compact.jpg' },
]

export default function Home() {
  return (
    <>
      <HeroSection />
      <VideoSlider />
      <CulturalHubPreview />
      <Testimonials />
      <LogoCarousel
        title="Trusted By"
        subtitle="Affiliations"
        logos={affiliationLogos}
      />
      <LogoCarousel
        title="Accreditations & Certifications"
        subtitle="Credentials"
        logos={accreditationLogos}
      />
    </>
  )
}
