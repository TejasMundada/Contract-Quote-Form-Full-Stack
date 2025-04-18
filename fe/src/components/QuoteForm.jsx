
import '../index.css'
import '../App.css'
import React, { useState } from 'react';
import axios from 'axios';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    contractor_name: '',
    company: '',
    roof_size: '',
    roof_type: '',
    city: '',
    state: '',
    project_date: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit', formData);
      setSuccessMessage('Quote submitted successfully!');
      setErrorMessage('');
      setFormData({
        contractor_name: '',
        company: '',
        roof_size: '',
        roof_type: '',
        city: '',
        state: '',
        project_date: '',
      });
    } catch (error) {
      setErrorMessage('Error submitting quote. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-200 px-4 py-12">
      <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-xl border border-gray-300">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Contractor Quote Submission</h2>
        <hr className="mb-8 border-gray-300" />

        {successMessage && <div className="mb-4 text-green-600 font-medium text-center">{successMessage}</div>}
        {errorMessage && <div className="mb-4 text-red-600 font-medium text-center">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">1. Contractor Name</label>
            <input
              type="text"
              placeholder="Enter contractor name"
              name="contractor_name"
              value={formData.contractor_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <hr className="mt-4 border-t border-gray-200" />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">2. Company</label>
            <input
              type="text"
              placeholder="Enter company name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <hr className="mt-4 border-t border-gray-200" />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">3. Roof Size (sq ft)</label>
            <input
              type="number"
              placeholder="Enter roof size"
              name="roof_size"
              value={formData.roof_size}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <hr className="mt-4 border-t border-gray-200" />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">4. Roof Type</label>
            <select
              name="roof_type"
              value={formData.roof_type}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Roof Type</option>
              <option value="Metal">Metal</option>
              <option value="TPO">TPO</option>
              <option value="Foam">Foam</option>
            </select>
            <hr className="mt-4 border-t border-gray-200" />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">5. Project City and State</label>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-1/2 border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-1/2 border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <hr className="mt-4 border-t border-gray-200" />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">6. Project Date</label>
            <input
              type="date"
              name="project_date"
              value={formData.project_date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <hr className="mt-4 border-t border-gray-200" />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="button-color text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;
