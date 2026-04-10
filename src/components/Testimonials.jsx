import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const testimonials = [
  {
    id: 1,
    quote: 'A transformative experience that changed how I see other cultures.',
    name: 'Stephania',
    role: 'Expat Family',
    rating: 5,
  },
  {
    id: 2,
    quote: 'The training was eye-opening for our entire family. We felt so prepared for our move.',
    name: 'The Mackenzies',
    role: 'Relocated Family',
    rating: 5,
  },
  {
    id: 3,
    quote: "Samar's insights helped 42 of our students gain a deeper understanding of cultural dynamics.",
    name: '42 Abu Dhabi Students',
    role: 'Educational Group',
    rating: 5,
  },
]

function Stars({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: '0.25rem' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? '#e5b981' : 'rgba(255,255,255,0.15)'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <div
      className="glass"
      style={{ borderRadius: '1.25rem', padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid rgba(255,255,255,0.08)', transition: 'border-color 0.3s' }}
    >
      {/* Quote mark */}
      <div style={{ marginBottom: '1.25rem' }}>
        <svg width="32" height="24" viewBox="0 0 32 24" fill="#e5b981" opacity="0.5">
          <path d="M0 24V14.4C0 6.4 5.333 1.6 16 0l1.6 3.2C11.733 4.267 8.533 6.933 8 11.2h6.4V24H0zm17.6 0V14.4C17.6 6.4 22.933 1.6 33.6 0L35.2 3.2C29.333 4.267 26.133 6.933 25.6 11.2H32V24H17.6z" />
        </svg>
      </div>

      <Stars count={testimonial.rating} />

      <blockquote style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.78)', fontSize: '1rem', lineHeight: 1.7, fontStyle: 'italic', flexGrow: 1 }}>
        "{testimonial.quote}"
      </blockquote>

      <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #e5b981, #d4a870)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#141717', fontWeight: 700, fontSize: '0.9rem' }}>{testimonial.name.charAt(0)}</span>
        </div>
        <div>
          <p style={{ color: '#fff', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>{testimonial.name}</p>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.8rem', margin: 0 }}>{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="section" style={{ backgroundColor: '#141717' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="section-label">Client Stories</span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, color: '#fff' }}>
            What Our Clients Say
          </h2>
          <div className="section-divider" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            style={{ paddingBottom: '3rem' }}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} style={{ height: 'auto' }}>
                <TestimonialCard testimonial={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
