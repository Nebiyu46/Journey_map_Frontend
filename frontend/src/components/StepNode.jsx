// src/components/StepNode.jsx
import { useState } from 'react'


function FeedbackSection({ step, onFeedbackChange }) {
  const [tempFeedback, setTempFeedback] = useState(step.userFeedback || "")
  const [currentRating, setCurrentRating] = useState(step.userRating || 0)
  return (
    <div style={{ marginTop: '20px', borderTop: '2px dashed #ccc', paddingTop: '15px' }}>
      <h5 style={{ margin: '0 0 10px 0', color: '#555' }}>Step Completed? Rate your experience:</h5>
      <div style={{ fontSize: '1.5rem', cursor: 'pointer', marginBottom: '10px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star}
            //onClick={() => onFeedbackChange(step.id, { userRating: star })}
            onClick={() => setCurrentRating(star)}
            style={{ color: star <= currentRating ? '#fbbf24' : '#d1d5db', marginRight: '5px' }}
          >
            ★
          </span>
        ))}
      </div>
      <textarea 
  placeholder="Any tips for future students?"
  value={tempFeedback}
  onChange={(e) => setTempFeedback(e.target.value)}
  style={{
    width: '100%', 
    padding: '12px', 
    boxSizing: 'border-box',
    borderRadius: '8px', 
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    minHeight: '80px',
    resize: 'vertical',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  }}
  onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
/>
      <button onClick={() => onFeedbackChange(step.id, { 
        userFeedback: tempFeedback, userRating: currentRating })}>Submit</button>
    </div>
  )
}

export default function StepNode({ step, statusChangefunc , feedbackChangefunc, personalCommentChangefunc}) {
  // 1. Initialize state. Default to false (collapsed) or true (expanded).
  const [isOpen, setIsOpen] = useState(false) 
  const [isPersonalOpen, togglePersonalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [TempComment, setTempComment] = useState(step.PersonalComment || "")


  // 2. Helper function to toggle state
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  // Check if this step actually has children (to decide if we show a toggle arrow)
  const hasChildren = step.children && step.children.length > 0
  
  const handlekeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      setIsEditing(false)
      setTempComment(e.target.value)
      personalCommentChangefunc(step.id, { PersonalComment: TempComment })
    }
  }
  


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
         {step.PersonalComment && (
          <div
            onClick={(e) => {
              e.stopPropagation()           // prevents opening/closing the whole step node
            }}
            style={{
              marginTop: '10px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <strong onClick={(e) => {
              e.stopPropagation()           // prevents opening/closing the whole step node
              togglePersonalOpen( !isPersonalOpen )    // toggles just the personal comment
            }}>Personal comment</strong> {isPersonalOpen ? '▼' : '▶'}

            {isPersonalOpen && (
              <div style={{ marginTop: '6px', color: 'var(--text-primary)' }}>
                <textarea 
                placeholder="Enter your personal comment here"
                value={TempComment}
                onChange={(e) => setTempComment(e.target.value)}
                onKeyDown={handlekeyDown}
                readOnly={!isEditing}
                onClick={() => setIsEditing(true)}
                style={{width: '100%', 
                  padding: '12px', 
                  boxSizing: 'border-box',
                  borderRadius: '8px', 
                  border: `1px solid ${isEditing ? 'var(--accent-color)' : 'var(--border-color)'}`,
                  backgroundColor: isEditing ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                  color: isEditing ? 'var(--text-primary)' : 'var(--text-secondary)',
                  opacity: isEditing ? 1 : 0.7,
                  minHeight: '80px',
                  resize: 'vertical',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  cursor: isEditing ? 'text' : 'pointer',
                  transition: 'all 0.2s ease'
          }} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Conditional Rendering: Only show children if isOpen is true */}
      {isOpen && (
        <div>
          <div className="step-children">
            {step.children.map((childStep) => (
              <StepNode key={childStep.id} step={childStep} statusChangefunc={statusChangefunc} feedbackChangefunc={feedbackChangefunc} />
            ))}           
          </div>
          <div>
          {step.hasFeedback && (
            <div className="step-node">
              <div className="step-content status-Comment">
                <FeedbackSection step={step} onFeedbackChange={feedbackChangefunc} />
              </div>
            </div>
          )}            
          </div>
        </div>
        
      )}
      
    </div>
  );
}