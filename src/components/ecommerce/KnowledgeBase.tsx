'use client';
import React from 'react';

// SVG Eye Icon
const EyeIcon = () => (
  <svg
    className="w-5 h-5 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

// Badge Component (встроенный)
const Badge = ({ children, color }: { children: React.ReactNode; color: 'success' | 'warning' | 'error' }) => {
  const colors = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};

interface KnowledgeBaseItem {
  id: number;
  name: string;
  company: string;
  description: string;
  mission: string;
  tone: string;
  contact: {
    phone: string;
    email: string;
    site: string;
    instagram: string;
    telegram: string;
  };
  kb: string;
  status: 'Active' | 'Pending' | 'Cancel';
}

const tableData: KnowledgeBaseItem[] = [
  {
    id: 1,
    name: 'Assistant One',
    company: 'Brand A',
    description: 'Main office location',
    mission: 'Provide expert support for customers',
    tone: 'Дружелюбный и экспертный',
    contact: {
      phone: '+1-123-456-7890',
      email: 'support@branda.com',
      site: 'www.branda.com',
      instagram: '@branda_insta',
      telegram: '@branda_tg',
    },
    kb: 'General knowledge about products and services',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Assistant Two',
    company: 'Brand B',
    description: 'Remote team setup',
    mission: 'Assist with technical queries',
    tone: 'Дружелюбный и экспертный',
    contact: {
      phone: '+1-987-654-3210',
      email: 'help@brandb.com',
      site: 'www.brandb.com',
      instagram: '@brandb_insta',
      telegram: '@brandb_tg',
    },
    kb: 'FAQ and troubleshooting guides',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Assistant Three',
    company: 'Brand C',
    description: 'Global operations',
    mission: 'Handle sales inquiries',
    tone: 'Дружелюбный и экспертный',
    contact: {
      phone: '+1-555-123-4567',
      email: 'info@brandc.com',
      site: 'www.brandc.com',
      instagram: '@brandc_insta',
      telegram: '@brandc_tg',
    },
    kb: 'Sales scripts and product details',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Assistant Four',
    company: 'Brand D',
    description: 'Local branch',
    mission: 'Customer service automation',
    tone: 'Дружелюбный и экспертный',
    contact: {
      phone: '+1-444-555-6666',
      email: 'service@brandd.com',
      site: 'www.brandd.com',
      instagram: '@brandd_insta',
      telegram: '@brandd_tg',
    },
    kb: 'Service protocols and policies',
    status: 'Cancel',
  },
  {
    id: 5,
    name: 'Assistant Five',
    company: 'Brand E',
    description: 'Headquarters',
    mission: 'General assistance',
    tone: 'Дружелюбный и экспертный',
    contact: {
      phone: '+1-777-888-9999',
      email: 'assist@brande.com',
      site: 'www.brande.com',
      instagram: '@brande_insta',
      telegram: '@brande_tg',
    },
    kb: 'Comprehensive company info',
    status: 'Active',
  },
];

export default function KnowledgeBase() {
  const [selectedMethods, setSelectedMethods] = React.useState<Record<number, string>>({});
  const [selectedItem, setSelectedItem] = React.useState<KnowledgeBaseItem | null>(null);

  return (
    <>
      {/* Table Container */}
      <div className="w-full overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Ассистент
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Компания
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Телефон
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Сайт
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Instagram
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Telegram
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Связь
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {tableData.map((item) => {
                const method = selectedMethods[item.id] || 'Telegram';
                // const contactValue =
                //   method === 'Telegram'
                //     ? item.contact.telegram
                //     : method === 'Instagram'
                //     ? item.contact.instagram
                //     : item.contact.phone;

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {item.company}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {item.contact.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {item.contact.email}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <a
                        href={`https://${item.contact.site}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {item.contact.site}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {item.contact.instagram}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {item.contact.telegram}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        color={
                          item.status === 'Active'
                            ? 'success'
                            : item.status === 'Pending'
                            ? 'warning'
                            : 'error'
                        }
                      >
                        {item.status === 'Active' ? 'Активен' : item.status === 'Pending' ? 'Ожидает' : 'Отменён'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={method}
                          onChange={(e) =>
                            setSelectedMethods({
                              ...selectedMethods,
                              [item.id]: e.target.value,
                            })
                          }
                          className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        >
                          <option value="Telegram">Telegram</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Telephony">Телефон</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group text-gray-500 dark:text-gray-400"
                        title="Подробности"
                        >
                        <EyeIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedItem.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {selectedItem.company}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">Описание</p>
                    <p className="text-sm">{selectedItem.description}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">Миссия</p>
                    <p className="text-sm">{selectedItem.mission}</p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">Тон общения</p>
                  <p className="text-sm italic">{selectedItem.tone}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">База знаний</p>
                  <p className="text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">{selectedItem.kb}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-3">Контакты</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-lg">Телефон</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{selectedItem.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-lg">Email</span>
                      <a href={`mailto:${selectedItem.contact.email}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {selectedItem.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-lg">Сайт</span>
                      <a href={`https://${selectedItem.contact.site}`} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {selectedItem.contact.site}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-lg">Instagram</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{selectedItem.contact.instagram}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg sm:col-span-2">
                      <span className="text-lg">Telegram</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{selectedItem.contact.telegram}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 dark:text-white">Статус:</span>
                    <Badge
                      color={
                        selectedItem.status === 'Active'
                          ? 'success'
                          : selectedItem.status === 'Pending'
                          ? 'warning'
                          : 'error'
                      }
                    >
                      {selectedItem.status === 'Active' ? 'Активен' : selectedItem.status === 'Pending' ? 'Ожидает' : 'Отменён'}
                    </Badge>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}