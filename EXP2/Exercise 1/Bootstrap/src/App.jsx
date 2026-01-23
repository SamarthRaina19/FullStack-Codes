import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [residence, setResidence] = useState('day')
  const [branch, setBranch] = useState('')

  return (
    <>
      <div className="container mt-5">
        <div className="card p-4 shadow-sm">
          <h2 className="text-center mb-4">Enter Student Details</h2>

          {/* Name Input */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Residence Toggle */}
          <div className="d-flex justify-content-center mb-4">
            <div className="btn-group" role="group" aria-label="Residence Type">

              <input
                type="radio"
                className="btn-check"
                name="residence"
                id="dayScholar"
                checked={residence === 'day'}
                onChange={() => setResidence('day')}
              />
              <label
                className="btn btn-outline-dark px-4 py-2 rounded-start-pill"
                htmlFor="dayScholar"
              >
                Day Scholar
              </label>

              <input
                type="radio"
                className="btn-check"
                name="residence"
                id="hosteler"
                checked={residence === 'hostel'}
                onChange={() => setResidence('hostel')}
              />
              <label
                className="btn btn-outline-dark px-4 py-2 rounded-end-pill"
                htmlFor="hosteler"
              >
                Hosteler
              </label>

            </div>
          </div>

          {/* Branch Selection */}
          <div className="btn-group w-100 mb-4" role="group">
            <button
              className={`btn ${branch === 'AIML' ? 'btn-dark' : 'btn-outline-primary'} rounded-5`}
              onClick={() => setBranch('AIML')}
            >
              AIML
            </button>
            <button
              className={`btn ${branch === 'BIG DATA' ? 'btn-dark' : 'btn-outline-primary'} rounded-5`}
              onClick={() => setBranch('BIG DATA')}
            >
              BIG DATA
            </button>
            <button
              className={`btn ${branch === 'GEN CSE' ? 'btn-dark' : 'btn-outline-primary'} rounded-5`}
              onClick={() => setBranch('GEN CSE')}
            >
              GEN CSE
            </button>
          </div>

          {/* Submit */}
          <button className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default App
