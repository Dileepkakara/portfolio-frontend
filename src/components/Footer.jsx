const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <div className="section-container">
        <p>&copy; {currentYear} Dileep Kakara. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
