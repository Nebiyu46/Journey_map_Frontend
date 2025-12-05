// src/App.jsx
import { useState } from 'react'
import { mockBlueprint } from './data/mockBlueprint'
import StepNode from './components/StepNode'

function App() {
  // We can keep state here later for things like "search" or "user progress"
  const [blueprint, setBlueprint] = useState(mockBlueprint)

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Header Section */}
      <header style={{ marginBottom: '30px', borderBottom: '2px solid #1f2937', paddingBottom: '10px' }}>
        <h1 style={{ margin: '0 0 10px 0' }}>{blueprint.title}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#374151' }}>
          <span>🏫 {blueprint.institution}</span>
          <span>Target: {blueprint.targetAudience}</span>
        </div>
      </header>

      {/* The Recursive List Starts Here */}
      <div className="blueprint-container">
        {blueprint.rootSteps.map((step) => (
          <StepNode key={step.id} step={step} />
        ))}
      </div>

    </div>
  )
}

export default App