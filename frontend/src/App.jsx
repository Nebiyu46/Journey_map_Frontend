// src/App.jsx
import { useState } from 'react'
import { useEffect } from 'react'
import { mockBlueprint } from './data/mockBlueprint'
import StepNode from './components/StepNode'

function App() {
  // We can keep state here later for things like "search" or "user progress"
  const [blueprint, setBlueprint] = useState(mockBlueprint)
  const [progress, setProgress] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)

  const calculateProgress = () => {
    let completed = 0;
    let total = 0;

    const traverse = (steps) => {
      steps.forEach((step) => {
        // Skip 'Comment' nodes if they shouldn't count
        if (step.status === "Comment") return;

        // Count this node
        total++;
        if (step.status === "Completed") {
          completed++;
        }

        // Recurse
        if (step.children && step.children.length > 0) {
          traverse(step.children);
        }
      });
    };

    traverse(blueprint.rootSteps);
    setProgress(completed);
    setTotalSteps(total);
  };
  useEffect(() => {
    calculateProgress()
  }, [blueprint])

  // ADD THIS LINE HERE so 'percent' is available for rendering
  const percent = totalSteps > 0 ? Math.round((progress / totalSteps) * 100) : 0;

  const handleStatusChange = (stepId) => {
    
    // Helper: Recursively find and update the step
    const updateStepInList = (steps) => {
      return steps.map((step) => {
        // A. If this is the step we clicked
        if (step.id === stepId) {
            // Check if the children are all completed for changes to complete 
            const allChildrenCompleted = step.children.every((child) => child.status === "Completed");
            let newStatus = "To_Do";
            if (step.status === "To_Do") newStatus = "In_Progress";
            else if (step.status === "In_Progress") {
              if ( allChildrenCompleted === false) {
                alert("Please complete all children steps before changing the status");
                return(step);
              } else {
                newStatus = "Completed";
              }
            } 
            else if (step.status === "Completed") newStatus = "To_Do";

            // Return a copy of the step with the new status
            return { ...step, status: newStatus };
        }

        // B. If this step has children, check them recursively
        if (step.children && step.children.length > 0) {
            return { ...step, children: updateStepInList(step.children) };
        }

        // C. Otherwise, return unchanged
        return step;
      });
    };

    // 3. Create a completely new blueprint object
    const newRootSteps = updateStepInList(blueprint.rootSteps);
    setBlueprint({ ...blueprint, rootSteps: newRootSteps });
  };
  const handleFeedbackChange = (stepId, newData) => {
    const updateRecursive = (steps) => {
      return steps.map((step) => {
        // Found the match? Update with whatever new data came in (rating or text)
        if (step.id === stepId) {
          return { ...step, ...newData }
        }
        // Keep searching children
        if (step.children && step.children.length > 0) {
          return { ...step, children: updateRecursive(step.children) }
        }
        return step
      })
    }

    setBlueprint(prev => ({
      ...prev,
      rootSteps: updateRecursive(prev.rootSteps)
    }))
  }
  
  
  return (
    <div style={{ maxWidth: '1000px', margin: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Header Section */}
      <header style={{ marginBottom: '30px', borderBottom: '2px solid #1f2937', paddingBottom: '10px' }}>
        <h1 style={{ margin: '0 0 10px 0' }}>{blueprint.title}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#374151' }}>
          <span>🏫 {blueprint.institution}</span>
          <span>Target: {blueprint.targetAudience}</span>
        </div>
        {/* Calculate percentage safely */}
        {/* Render */}
        <div style={{ width: '100%', height: '20px', backgroundColor: '#e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${percent}%`, height: '100%', backgroundColor: '#4ade80', transition: 'width 0.3s' }}></div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '5px' }}>{progress} / {totalSteps} steps completed ({percent}%)</div>
      </header>

      {/* The Recursive List Starts Here */}
      <div className="blueprint-container">
        {blueprint.rootSteps.map((step) => (
          <StepNode 
            key={step.id} 
            step={step} 
            statusChangefunc={handleStatusChange}
            feedbackChangefunc={handleFeedbackChange}
             />
        ))}
      </div>

    </div>
  )
}

export default App