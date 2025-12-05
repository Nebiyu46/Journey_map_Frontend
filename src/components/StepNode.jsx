// src/components/StepNode.jsx
import { useState } from 'react'

export default function StepNode({ step }) {
  // 1. Initialize state. Default to false (collapsed) or true (expanded).
  const [isOpen, setIsOpen] = useState(false) 

  // 2. Helper function to toggle state
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  // Check if this step actually has children (to decide if we show a toggle arrow)
  const hasChildren = step.children && step.children.length > 0

  const statusMap = {
    "To Do": "status-todo",
    "In Progress": "status-inprogress",
    "Completed": "status-completed",
    "Complete": "status-completed",
    "Comment": "status-comment" // The new "informational" style
  }
  const statusClass = statusMap[step.status] || "status-todo"

  return (
    <div className="step-node">
      
      {/* 3. Add onClick to the content card */}
      <div 
        className={`step-content ${statusClass}`}
        onClick={toggleOpen}
        style={{ cursor: hasChildren ? 'pointer' : 'default' }} // Visual cue
      >
         <h4>
           {/* Optional: Add a visual arrow indicator */}
           {hasChildren && (
             <span style={{ marginRight: '10px' }}>
               {isOpen ? '▼' : '▶'}
             </span>
           )}
           {step.title} 
           <span style={{fontSize: '0.8em', color: 'gray', marginLeft: '10px'}}>
             ({step.status})
           </span>
         </h4>
         <p>{step.details}</p>
      </div>

      {/* 4. Conditional Rendering: Only show children if isOpen is true */}
      {isOpen && (
        <div className="step-children">
          {step.children.map((childStep) => (
            <StepNode key={childStep.id} step={childStep} />
          ))}
        </div>
      )}
      
    </div>
  );
}