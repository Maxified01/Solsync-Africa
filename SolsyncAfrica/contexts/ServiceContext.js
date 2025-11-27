import React, { createContext, useState, useContext } from 'react';

const ServiceContext = createContext();

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};

export const ServiceProvider = ({ children }) => {
  const [technicians, setTechnicians] = useState([
    {
      id: 1,
      name: 'Jean Paul',
      specialization: 'Solar Systems',
      rating: 4.8,
      completedJobs: 124,
      responseTime: '2-4 hours',
      location: 'Kigali, Rwanda',
      phone: '+250788123456',
      languages: ['Kinyarwanda', 'English', 'French'],
      availability: 'available'
    },
    {
      id: 2,
      name: 'Marie Uwase',
      specialization: 'Battery Systems',
      rating: 4.9,
      completedJobs: 89,
      responseTime: '1-3 hours',
      location: 'Kigali, Rwanda',
      phone: '+250788654321',
      languages: ['Kinyarwanda', 'English'],
      availability: 'available'
    },
    {
      id: 3,
      name: 'David Smith',
      specialization: 'Panel Installation',
      rating: 4.7,
      completedJobs: 156,
      responseTime: '4-6 hours',
      location: 'Kigali, Rwanda',
      phone: '+250788987654',
      languages: ['English', 'Swahili'],
      availability: 'busy'
    }
  ]);

  const [serviceRequests, setServiceRequests] = useState([
    {
      id: 1,
      title: 'Battery Replacement',
      description: 'Battery not holding charge properly',
      urgency: 'high',
      status: 'pending',
      date: '2024-10-15',
      technicianId: null,
      userId: 1
    }
  ]);

  const createServiceRequest = (requestData) => {
    const newRequest = {
      id: Date.now(),
      ...requestData,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      technicianId: null
    };
    
    setServiceRequests(prev => [newRequest, ...prev]);
    
    // Auto-assign technician based on specialization and availability
    autoAssignTechnician(newRequest.id, requestData.issueType);
    
    return newRequest;
  };

  const autoAssignTechnician = (requestId, issueType) => {
    setTimeout(() => {
      const availableTechs = technicians.filter(tech => 
        tech.availability === 'available' && 
        tech.specialization.toLowerCase().includes(issueType.toLowerCase())
      );
      
      if (availableTechs.length > 0) {
        const assignedTech = availableTechs[0];
        updateServiceRequest(requestId, { 
          technicianId: assignedTech.id, 
          status: 'assigned' 
        });
      }
    }, 2000);
  };

  const updateServiceRequest = (requestId, updates) => {
    setServiceRequests(prev =>
      prev.map(request =>
        request.id === requestId ? { ...request, ...updates } : request
      )
    );
  };

  const getTechnicianById = (technicianId) => {
    return technicians.find(tech => tech.id === technicianId);
  };

  const value = {
    technicians,
    serviceRequests,
    createServiceRequest,
    updateServiceRequest,
    getTechnicianById
  };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
};