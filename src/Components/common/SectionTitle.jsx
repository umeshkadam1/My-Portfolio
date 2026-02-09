import '../../styles/components/SectionTitle.css'

const SectionTitle = ({ title, subtitle }) => {
  return (
    <header className="section-title">
      <h2 className="section-heading">{title}</h2>      

      {subtitle && (
        <p className="section-subheading">{subtitle}</p>
      )}

      <div className="title-line" aria-hidden="true"></div>
    </header>
  )
}

export default SectionTitle;

