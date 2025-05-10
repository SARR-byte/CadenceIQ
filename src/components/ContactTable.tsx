import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { format, addDays } from 'date-fns';
import { generateInsights } from '../lib/openai';
import { addToCalendar } from '../lib/calendar';
import Papa from 'papaparse';
import ReactCanvasConfetti from 'react-canvas-confetti';

interface Contact {
  id: string;
  entityName: string;
  primaryContact: string;
  emailAddress: string;
  phoneNumber: string;
  companyLinkedIn: string;
  contactLinkedIn: string;
  contactFacebook: string;
  notes: string;
  stage: 'First Email' | 'Second Email' | 'Phone/LinkedIn Connect' | 'Breakup Email';
  attempted: boolean;
  nextContactDate?: Date;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const STAGES = ['First Email', 'Second Email', 'Phone/LinkedIn Connect', 'Breakup Email'];

export function ContactTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedStage, setSelectedStage] = useState('First Email');
  const [fire, setFire] = useState(false);

  const handleContactAttempted = async (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    const currentStageIndex = STAGES.indexOf(contact.stage);
    if (currentStageIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentStageIndex + 1];
      const nextContactDate = addDays(new Date(), 7);

      const updatedContact = {
        ...contact,
        stage: nextStage as Contact['stage'],
        attempted: true,
        nextContactDate
      };

      await addToCalendar({
        title: `${nextStage} - ${contact.entityName}`,
        description: `Follow up with ${contact.primaryContact} from ${contact.entityName}`,
        startDate: nextContactDate,
        endDate: addDays(nextContactDate, 1)
      });

      setContacts(contacts.map(c => 
        c.id === contactId ? updatedContact : c
      ));

      const allAttempted = contacts.every(c => 
        c.stage === contact.stage ? c.attempted : true
      );

      if (allAttempted) {
        setFire(true);
        setTimeout(() => setFire(false), 3000);
      }
    }
  };

  const handleGenerateInsights = async (contact: Contact) => {
    try {
      const insights = await generateInsights(contact.contactLinkedIn, contact.contactFacebook);
      const updatedContact = {
        ...contact,
        notes: insights || ''
      };
      setContacts(contacts.map(c => 
        c.id === contact.id ? updatedContact : c
      ));
    } catch (error) {
      console.error('Error generating insights:', error);
    }
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        const newContacts: Contact[] = results.data.slice(1).map((row: any) => ({
          id: crypto.randomUUID(),
          entityName: row[0] || '',
          primaryContact: row[1] || '',
          emailAddress: row[2] || '',
          phoneNumber: row[3] || '',
          companyLinkedIn: row[4] || '',
          contactLinkedIn: row[5] || '',
          contactFacebook: row[6] || '',
          notes: row[7] || '',
          stage: 'First Email',
          attempted: false
        }));
        setContacts([...contacts, ...newContacts]);
      },
      header: false
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleImportCSV}
          className="hidden"
          id="csvInput"
        />
        <label
          htmlFor="csvInput"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Import CSV
        </label>
      </div>

      <Tabs value={selectedDay} onValueChange={setSelectedDay}>
        <TabsList>
          {DAYS.map(day => (
            <TabsTrigger key={day} value={day}>
              {day}
            </TabsTrigger>
          ))}
        </TabsList>

        {DAYS.map(day => (
          <TabsContent key={day} value={day}>
            <div className="mb-4">
              <select 
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="border p-2 rounded"
              >
                {STAGES.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Entity Name</th>
                  <th className="border p-2">Primary Contact</th>
                  <th className="border p-2">Email Address</th>
                  <th className="border p-2">Phone Number</th>
                  <th className="border p-2">Company LinkedIn</th>
                  <th className="border p-2">Contact LinkedIn</th>
                  <th className="border p-2">Contact Facebook</th>
                  <th className="border p-2">Notes</th>
                  <th className="border p-2">Insights</th>
                  <th className="border p-2">Contact Attempted</th>
                </tr>
              </thead>
              <tbody>
                {contacts
                  .filter(contact => contact.stage === selectedStage)
                  .map(contact => (
                    <tr key={contact.id}>
                      <td className="border p-2">{contact.entityName}</td>
                      <td className="border p-2">{contact.primaryContact}</td>
                      <td className="border p-2">{contact.emailAddress}</td>
                      <td className="border p-2">{contact.phoneNumber}</td>
                      <td className="border p-2">{contact.companyLinkedIn}</td>
                      <td className="border p-2">{contact.contactLinkedIn}</td>
                      <td className="border p-2">{contact.contactFacebook}</td>
                      <td className="border p-2">{contact.notes}</td>
                      <td className="border p-2">
                        <button
                          onClick={() => handleGenerateInsights(contact)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          💡
                        </button>
                      </td>
                      <td className="border p-2">
                        <input
                          type="checkbox"
                          checked={contact.attempted}
                          onChange={() => handleContactAttempted(contact.id)}
                          className="w-4 h-4"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </TabsContent>
        ))}
      </Tabs>
      
      <ReactCanvasConfetti
        fire={fire}
        spread={90}
        startVelocity={45}
        gravity={1}
        drift={0}
        particleCount={200}
        colors={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']}
        origin={{ x: 0.5, y: 0.7 }}
      />
    </div>
  );
}