"use client"; // Se estiver usando App Router (Next.js 13)

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
  _id?: string;
  title: string;
  description: string;
  date?: string;
  completed?: boolean; // controla se evento está concluído
}

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({ title: '', description: '', date: '', completed: false });
  const [errorMsg, setErrorMsg] = useState('');

  // Para edição
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEvent, setEditEvent] = useState<Event>({ title: '', description: '', date: '' });

  // FILTROS:
  // timeFilter: 'dia', 'mes', 'todos'
  // completionFilter: 'todos', 'concluido', 'aberto'

  const [timeFilter, setTimeFilter] = useState<'dia' | 'mes' | 'todos' >('todos');
  const [completionFilter, setCompletionFilter] = useState<'todos' | 'concluido' | 'aberto'>('todos');

  // URL backend
  const API_URL = 'http://localhost:3000/events';

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(API_URL);
      setEvents(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  // Criação de um novo evento
  const createEvent = async () => {
    // Validação dos campos preenchidos
    if (!newEvent.title.trim() || !newEvent.description.trim() || !newEvent.date) {
      setErrorMsg('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await axios.post(API_URL, newEvent);
      setNewEvent({ title: '', description: '', date: '', completed: false });
      setErrorMsg('');
      fetchEvents();
    } catch (error: any) {
      console.error('Erro ao criar evento:', error);
      if (error?.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } 
    }
  };

  // Editar
  const handleEditClick = (event: Event) => {
    setEditingId(event._id || null);
    setEditEvent({
      title: event.title,
      description: event.description,
      date: event.date || '',
      completed: event.completed || false,
    });
    setErrorMsg('');
  };

  const updateEvent = async (id: string) => {
    if (!editEvent.title?.trim() || !editEvent.description?.trim() || !editEvent.date) {
      setErrorMsg('Por favor, preencha todos os campos ao editar.');
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, editEvent);
      setEditingId(null);
      setErrorMsg('');
      fetchEvents();
    } catch (error: any) {
      console.error('Erro ao atualizar evento:', error);
      if (error?.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      }
    }
  };

  // Excluir
  const deleteEvent = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEvents();
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
    }
  };

  // Marcar como concluído
  const markAsCompleted = async (event: Event) => {
    try {
      await axios.put(`${API_URL}/${event._id}`, {
        ...event,
        completed: true,
      });
      fetchEvents();
    } catch (error) {
      console.error('Erro ao marcar evento como concluído:', error);
    }
  };


  // Filtro de data
  // dia => tarefa do hoje
  // mes =>tarefa do mês atual
  // todos => exibe todos
  function applyTimeFilter(e: Event): boolean {
    if (!e.date) return false;
    const evtDate = new Date(e.date);
    const now = new Date();

    switch (timeFilter) {
      case 'dia': {
        return (
          evtDate.getFullYear() === now.getFullYear() &&
          evtDate.getMonth() === now.getMonth() &&
          evtDate.getDate() === now.getDate()
        );
      }
      case 'mes': {
        return (
          evtDate.getFullYear() === now.getFullYear() &&
          evtDate.getMonth() === now.getMonth()
        );
      }
      default:
        // 'todos'
        return true;
    }
  } 

  // Filtro de status
  // concluido => e.completed === true
  // aberto => e.completed === false
  // todos => sem filtro
  function applyCompletionFilter(e: Event): boolean {
    switch (completionFilter) {
      case 'concluido':
        return e.completed === true;
      case 'aberto':
        return e.completed === false;
      default:
        // 'todos'
        return true;
    }
  }

  // Combinação dos filtros
  const filteredEvents = events.filter((e) => applyTimeFilter(e) && applyCompletionFilter(e));

  // Ordenação crescente
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateA - dateB; // crescente => data antiga primeiro
  });

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="p-10 w-full text-center bg-[#10b981] text-white">
        <h1 className="text-4xl font-black">StaK</h1>
        <span className="uppercase font-light text-lg">Seu gerenciador de tarefas pessoal!</span>
      </div>
      

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          {errorMsg}
        </div>
      )}

      {/* Formulário para criação de evento */}
      <div className="mt-8 mb-6 bg-white p-6 py-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <input
          className="border p-2 w-full mb-2 rounded focus:outline-0 focus:border-[#2ed573]"
          type="text" 
          placeholder="Título"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <textarea
          className="border p-2 w-full mb-2 rounded focus:outline-0 focus:border-[#2ed573]"
          placeholder="Descrição"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
        />
        <input
          className="border p-2 w-full mb-2 rounded focus:outline-0 focus:border-[#2ed573]"
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <button
          className="bg-[#10b981] text-white px-4 py-2 rounded hover:bg-[#2ed573] mt-4"
          onClick={createEvent}
        >
          Adicionar Evento
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-6 bg-white p-4 rounded-2xl shadow-lg w-full max-w-3xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className="font-semibold mr-2">Data:</label>
            <select
              className="border p-2 rounded focus:outline-0 focus:border-[#2ed573]"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as 'dia' | 'mes' | 'todos')}
            >
              <option value="todos">Todos</option>
              <option value="dia">Dia</option>
              <option value="mes">Mês</option>
            </select>
          </div>

          <div>
            <label className="font-semibold mr-2">Status:</label>
            <select
              className="border p-2 rounded focus:outline-0 focus:border-[#2ed573]"
              value={completionFilter}
              onChange={(e) => setCompletionFilter(e.target.value as 'todos' | 'concluido' | 'aberto')}
            >
              <option value="todos">Todos</option>
              <option value="aberto">Em Aberto</option>
              <option value="concluido">Concluídos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Eventos */}
      <ul className="w-full max-w-3xl mb-10">
        {sortedEvents.map((event) => (
          <li
            key={event._id}
            className={`mb-2 p-4 rounded-2xl shadow-lg ${event.completed ? 'bg-[#7bed9f] text-[#4f4f4f]' : 'bg-white'}`}
          >
            {editingId === event._id ? (
              // Formulário de edição
              <div>
                <input
                  className="border p-2 w-full mb-2 rounded"
                  type="text"
                  value={editEvent.title}
                  onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
                  placeholder="Título"
                />
                <textarea
                  className="border p-2 w-full mb-2 rounded"
                  value={editEvent.description}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, description: e.target.value })
                  }
                  placeholder="Descrição"
                />
                <input
                  className="border p-2 w-full mb-2 rounded"
                  type="date"
                  value={editEvent.date}
                  onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 mr-2 rounded hover:bg-green-600"
                  onClick={() => updateEvent(event._id!)}
                >
                  Salvar
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => {
                    setEditingId(null);
                    setErrorMsg('');
                  }}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              // Exibição dos dados do evento
              <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p>{event.description}</p>
                {event.date && (
                  <p>
                    <strong>Data:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEditClick(event)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => event._id && deleteEvent(event._id)}
                  >
                    Excluir
                  </button>
                  {!event.completed && (
                    <button
                      className="bg-[#2ed573] text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => markAsCompleted(event)}
                    >
                      Concluir
                    </button>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mb-6 bg-white p-4 rounded-2xl shadow-lg w-full max-w-3xl text-center bg-emerald-500 text-white">
        <a className="font-bold uppercase" href="/tabela">Lista de Tarefas</a>
      </div>
    </div>
  );
}

