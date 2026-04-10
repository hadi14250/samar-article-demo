import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const videos = [
  { id: 1, image: '/images/about-me-thumbnail.jpg', title: 'About Me' },
  { id: 2, image: '/images/tck-thumbnail.jpg', title: 'Third Culture Kids' },
  { id: 3, image: '/images/misconceptions-thumbnail.jpg', title: 'Misconceptions' },
  { id: 4, image: '/images/dynamic-teams.jpg', title: 'Dynamic Teams' },
  { id: 5, image: '/images/family-relocation.jpg', title: 'Family Relocation' },
]

function VideoCard({ video }) {
  return (
    <div
      style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', backgroundColor: '#1e2222', cursor: 'pointer', aspectRatio: '16/9' }}
      className="video-card"
    >
      <img
        src={video.image}
        alt={video.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
        className="video-card-img"
      />
      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,23,23,0.8) 0%, transparent 50%)' }} />

      {/* Play button */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          className="play-btn"
          style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(229,185,129,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s, background-color 0.3s', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#141717" style={{ marginLeft: 3 }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem' }}>
        <h3 style={{ color: '#fff', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>
          {video.title}
        </h3>
      </div>

      <style>{`
        .video-card:hover .video-card-img { transform: scale(1.05); }
        .video-card:hover .play-btn { transform: scale(1.12); background-color: #e5b981; }
      `}</style>
    </div>
  )
}

export default function VideoSlider() {
  return (
    <section className="section" style={{ backgroundColor: '#141717' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="section-label">Insights & Education</span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, color: '#fff' }}>Watch & Learn</h2>
          <div className="section-divider" />
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              600: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            style={{ paddingBottom: '3rem' }}
          >
            {videos.map((video) => (
              <SwiperSlide key={video.id}>
                <VideoCard video={video} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
