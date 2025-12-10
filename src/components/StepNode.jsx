// src/components/StepNode.jsx
import { useState } from 'react'

export default function StepNode({ step, statusChangefunc }) {
  // 1. Initialize state. Default to false (collapsed) or true (expanded).
  const [isOpen, setIsOpen] = useState(false) 

  // 2. Helper function to toggle state
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  // Check if this step actually has children (to decide if we show a toggle arrow)
  const hasChildren = step.children && step.children.length > 0


  return (
    <div className="step-node">
      
      {/* 3. Add onClick to the content card */}
      <div 
        className={`step-content status-${step.status}`}
        onClick={toggleOpen}
        style={{ cursor: hasChildren ? 'pointer' : 'default' }} // Visual cue
      >
         <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
           {/* Wrap left-side content in a span to keep them together */}
           <span>
             {hasChildren && (
               <span style={{ marginRight: '10px' }}>
                 {isOpen ? '▼' : '▶'}
               </span>
             )}
             {step.title} 
             <span style={{fontSize: '0.8em', color: 'gray', marginLeft: '10px'}}>
               ({step.status})
             </span>
           </span>

            { step.status !== "Comment" && (
              <button style={{marginRight: '10px'}} onClick={(e) => {e.stopPropagation(); statusChangefunc(step.id);}}>
            {(() => {
              switch (step.status) {
                case "To_Do":
                  return "Start"
                case "In_Progress":
                  return "Check"
                case "Completed":
                  return "Reset"
                default:
                  return "Start"
              }
            })()}
           </button>
           )}
         </h4>
         <p>{step.details}</p>
      </div>

      {/* 4. Conditional Rendering: Only show children if isOpen is true */}
      {isOpen && (
        <div className="step-children">
          {step.children.map((childStep) => (
            <StepNode key={childStep.id} step={childStep} statusChangefunc={statusChangefunc} />
          ))}
        </div>
      )}
      
    </div>
  );
}