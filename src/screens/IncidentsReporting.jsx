import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


export function IncidentsReporting() {
  const [formData, setFormData] = useState({
    location: '',
    incidentType: '',
    personsInvolved: '',
    role: '',
    injuries: '',
    medicalTreatment: '',
    treatmentDescription: '',
    description: '',
    immediateCause: '',
    contributingFactors: '',
    rootCause: '',
    impactNature: '',
    severity: '',
    firstAid: '',
    actionsTaken: '',
    correctiveActions: '',
    investigation: '',
    investigator: '',
    preventativeMeasures: '',
    suggestedImprovements: '',
    recommendations: '',
    completionDate: '',
    responsiblePerson: '',
    submitterName: '',
    submitterPosition: '',
    submitterSignature: '',
    submitDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Incident report submitted successfully!');
    // You can send the form data to an API or backend here
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Incident Reporting Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Location of Incident */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location of Incident:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Incident Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Incident Type:</label>
            <select
              name="incidentType"
              value={formData.incidentType}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Incident Type</option>
              <option value="accident">Accident (e.g., injury, illness)</option>
              <option value="nearMiss">Near Miss (e.g., narrowly avoided injury/damage)</option>
              <option value="propertyDamage">Property Damage (e.g., equipment, vehicles)</option>
              <option value="environmental">Environmental Incident (e.g., spill, pollution)</option>
              <option value="fireExplosion">Fire or Explosion</option>
              <option value="unsafeCondition">Unsafe Condition (e.g., hazards)</option>
              <option value="healthRelated">Health-Related Incident (e.g., exposure to harmful substances)</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Persons Involved */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name of Person(s) Involved:</label>
            <input
              type="text"
              name="personsInvolved"
              value={formData.personsInvolved}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Role/Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role/Position:</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Injuries */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Injuries (if applicable):</label>
            <select
              name="injuries"
              value={formData.injuries}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Injury Type</option>
              <option value="minor">Minor Injury (e.g., cuts, bruises)</option>
              <option value="serious">Serious Injury (e.g., fractures, sprains)</option>
              <option value="fatality">Fatality</option>
              <option value="firstAid">First Aid Given</option>
              <option value="noInjury">No Injury</option>
            </select>
          </div>

          {/* Medical Treatment */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Was medical treatment required?</label>
            <div className="mt-1 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="medicalTreatment"
                  value="yes"
                  checked={formData.medicalTreatment === 'yes'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="medicalTreatment"
                  value="no"
                  checked={formData.medicalTreatment === 'no'}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {/* Treatment Description */}
          {formData.medicalTreatment === 'yes' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">If yes, describe treatment:</label>
              <textarea
                name="treatmentDescription"
                value={formData.treatmentDescription}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}

          {/* Description of Incident */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description of Incident:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Immediate Cause */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Immediate Cause of Incident:</label>
            <input
              type="text"
              name="immediateCause"
              value={formData.immediateCause}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Contributing Factors */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contributing Factors:</label>
            <textarea
              name="contributingFactors"
              value={formData.contributingFactors}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Root Cause Analysis */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Root Cause Analysis:</label>
            <textarea
              name="rootCause"
              value={formData.rootCause}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Incident Impact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nature of Damage/Injury:</label>
            <select
              name="impactNature"
              value={formData.impactNature}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Nature of Impact</option>
              <option value="propertyDamage">Property Damage</option>
              <option value="injuryIllness">Injury/Illness</option>
              <option value="environmental">Environmental Impact</option>
              <option value="business">Business Impact (e.g., work stoppage)</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Severity of Damage/Injury:</label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Severity</option>
              <option value="minor">Minor</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {/* First Aid Administered */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Was First Aid Administered?</label>
            <div className="mt-1 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="firstAid"
                  value="yes"
                  checked={formData.firstAid === 'yes'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="firstAid"
                  value="no"
                  checked={formData.firstAid === 'no'}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {/* Actions Taken */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Actions Taken to Control/Contain Incident:</label>
            <textarea
              name="actionsTaken"
              value={formData.actionsTaken}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Corrective Actions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Corrective Actions Taken:</label>
            <textarea
              name="correctiveActions"
              value={formData.correctiveActions}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Investigation Conducted */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Investigation Conducted?</label>
            <div className="mt-1 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="investigation"
                  value="yes"
                  checked={formData.investigation === 'yes'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="investigation"
                  value="no"
                  checked={formData.investigation === 'no'}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {/* Investigator */}
          {formData.investigation === 'yes' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">If yes, by whom:</label>
              <input
                type="text"
                name="investigator"
                value={formData.investigator}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}

          {/* Preventative Measures */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Corrective Actions/Preventative Measures Implemented:</label>
            <textarea
              name="preventativeMeasures"
              value={formData.preventativeMeasures}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Suggested Improvements */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Suggested Improvements:</label>
            <textarea
              name="suggestedImprovements"
              value={formData.suggestedImprovements}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Recommendations */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Recommendations for Future Prevention:</label>
            <textarea
              name="recommendations"
              value={formData.recommendations}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Completion Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Completion Date of Corrective Actions:</label>
            <input
              type="date"
              name="completionDate"
              value={formData.completionDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Person(s) Responsible */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Person(s) Responsible for Corrective Actions:</label>
            <input
              type="text"
              name="responsiblePerson"
              value={formData.responsiblePerson}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Report Submitted By */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Submitted by:</label>
            <input
              type="text"
              name="submitterName"
              value={formData.submitterName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submitter Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Position:</label>
            <input
              type="text"
              name="submitterPosition"
              value={formData.submitterPosition}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submitter Signature */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Signature:</label>
            <input
              type="text"
              name="submitterSignature"
              value={formData.submitterSignature}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submit Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              name="submitDate"
              value={formData.submitDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

