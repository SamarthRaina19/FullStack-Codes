import './App.css'

function App() {
  const cards = [
    { title: 'AI & ML', desc: 'Artificial Intelligence & Machine Learning' },
    { title: 'DSA', desc: 'Data Structures & Algorithms' },
    { title: 'Game Dev', desc: 'Game Development' },
    { title: 'VFX', desc: 'Visual Effects & Animation' },
  ]

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">
        Course Categories
      </h2>

      <div className="row g-4">
        {cards.map((card, index) => (
          <div className="col-12 col-sm-6 col-md-3" key={index}>
            <div className="card h-100 shadow-sm border-0 card-hover">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-semibold">
                  {card.title}
                </h5>
                <p className="card-text text-muted flex-grow-1">
                  {card.desc}
                </p>
                <button className="btn btn-outline-dark mt-3">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
