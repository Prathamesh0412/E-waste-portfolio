import React, { useState, useEffect } from 'react';
import AssignmentCard from './AssignmentCard';
import AssignmentDetail from './AssignmentDetail';
import ScrollReveal from './ScrollReveal';
import SectionLabel from './SectionLabel';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        // Using a try-catch for the fetch, but providing dummy data as fallback if API doesn't exist
        try {
          const response = await fetch('/api/assignments');
          if (response.ok) {
            const data = await response.json();
            
            const safeParse = (str) => {
              if (!str) return [];
              if (Array.isArray(str)) return str;
              if (typeof str === 'string') {
                try { return JSON.parse(str); } 
                catch(e) { return str.split(',').map(s => s.trim()).filter(Boolean); }
              }
              return [];
            };

            const published = data.filter(a => a.status === 'published').map(a => ({
              ...a,
              tags: safeParse(a.tags),
              learning_outcomes: safeParse(a.learning_outcomes)
            }));
            
            setAssignments(published);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn('API fetch failed, using fallback data', e);
        }

        // Fallback data for demonstration if API fails
        const fallbackData = [
          {
            id: 1,
            number: '01',
            title: 'Life Cycle Analysis of Smartphones',
            description: 'A comprehensive evaluation of the environmental impact of modern smartphones from resource extraction to end-of-life disposal.',
            content: 'This assignment explores the intricate supply chain of smartphone manufacturing, highlighting the rare earth metals required and the massive carbon footprint of production. It concludes with actionable strategies for improving circularity in consumer electronics.',
            category: 'Analysis',
            tags: ['LCA', 'Mobile', 'Circularity'],
            status: 'published',
            date: '2023-09-15',
            learning_outcomes: ['Understand LCA methodologies', 'Identify key environmental hotspots in electronics', 'Evaluate mitigation strategies']
          },
          {
            id: 2,
            number: '02',
            title: 'E-Waste Policy Comparison',
            description: 'Comparative study of e-waste management legislation between the European Union, United States, and Japan.',
            content: 'Analyzing different legislative approaches to e-waste management. The study contrasts the mandatory Extended Producer Responsibility (EPR) frameworks in the EU with state-level initiatives in the US and the consumer-pays model in Japan.',
            category: 'Policy',
            tags: ['Policy', 'EPR', 'Global'],
            status: 'published',
            date: '2023-10-22',
            learning_outcomes: ['Analyze international regulatory frameworks', 'Evaluate policy effectiveness', 'Propose evidence-based recommendations']
          },
          {
            id: 3,
            number: '03',
            title: 'Sustainable Material Alternatives',
            description: 'Research into biodegradable and easily recyclable materials that could replace problematic plastics and resins in electronic enclosures.',
            content: 'Investigating promising developments in bio-based polymers and standardized alloy components that maintain structural integrity while significantly improving end-of-life recyclability.',
            category: 'Research',
            tags: ['Materials', 'Innovation', 'Design'],
            status: 'published',
            date: '2023-11-10',
            learning_outcomes: ['Identify problematic materials in current devices', 'Assess viability of sustainable alternatives', 'Understand material property requirements for electronics']
          }
        ];
        
        setTimeout(() => {
          setAssignments(fallbackData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to load assignments');
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <section id="assignments" className="section-padding bg-bg relative">
      <div className="container-main">
        <ScrollReveal>
          <SectionLabel number="07" label="ACADEMIC WORK" />
          <h2 className="text-hero font-heading text-dark mt-6 mb-12 leading-tight">
            My<br />
            <span className="serif-accent italic text-primary">Assignments.</span>
          </h2>
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-soft border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-card border border-red-100">
            <p className="text-body">{error}</p>
          </div>
        ) : assignments.length === 0 ? (
          <div className="card p-12 text-center shadow-sm">
            <p className="text-secondary text-body-lg">
              Assignments will appear here as they are added.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assignments.map((assignment, index) => (
              <ScrollReveal 
                key={assignment.id || index} 
                delay={(index % 3) * 100}
                className="h-full"
              >
                <AssignmentCard 
                  assignment={assignment} 
                  onClick={setSelectedAssignment} 
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {selectedAssignment && (
        <AssignmentDetail 
          assignment={selectedAssignment} 
          onClose={() => setSelectedAssignment(null)} 
        />
      )}
    </section>
  );
};

export default Assignments;
