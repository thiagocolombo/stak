"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Event {
  _id?: string;
  title: string;
  description: string;
  date?: string;
}
 
export default function TabelaEventos() {
  const [events, setEvents] = useState<Event[]>([]);
  // Filtros e ordenação
  const [monthFilter, setMonthFilter] = useState<string>("");
  const [sortByRecent, setSortByRecent] = useState<boolean>(true);

  const API_URL = "http://localhost:3000/events";

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(API_URL);
      setEvents(response.data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  // Ordena por data
  const sortEvents = (data: Event[]): Event[] => {
    const sorted = [...data].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      if (sortByRecent) {
        return dateB - dateA; //crescente
      } else {
        return dateA - dateB; //decrescente
      }
    });
    return sorted;
  };

  // Filtro de mês: exibe só eventos do mês selecionado ou ("" => todos)
  const filterByMonth = (data: Event[]): Event[] => {
    if (monthFilter === "") return data;
    const monthNum = parseInt(monthFilter, 10); // 0..11
    return data.filter((evt) => {
      if (!evt.date) return false;
      const eventDate = new Date(evt.date);
      return eventDate.getMonth() === monthNum;
    });
  };

  // Função para exportar como PDF usando jsPDF e autoTable
  const exportToPdf = () => {
    // Filtra e ordena os eventos antes de exportar
    const filtered = filterByMonth(events);
    const finalData = sortEvents(filtered);

    // Cria uma nova instância de jsPDF
    const doc = new jsPDF();

    // Montamos o cabeçalho e o corpo
    const head = [["Título", "Descrição", "Data"]];
    const body = finalData.map((evt) => [
      evt.title,
      evt.description,
      evt.date ? new Date(evt.date).toLocaleDateString() : "",
    ]);

    // Usamos autoTable para gerar a tabela
    autoTable(doc, {
      head,
      body,
      startY: 10, // margem superior
      styles: { font: "helvetica", fontSize: 10 },
      headStyles: {
        fillColor: "#f2f2f2",
        textColor: "#000",
        lineWidth: 0.1,
        lineColor: "#ccc",
      },
      bodyStyles: {
        lineWidth: 0.1,
        lineColor: "#ccc",
      },
      tableWidth: "auto",
    });

    
    doc.save("tarefas.pdf");
  };

  // Antes de renderizar, aplica o filtro de ordenação
  const filteredEvents = filterByMonth(events);
  const finalEvents = sortEvents(filteredEvents);

  return (
    <div className="min-h-screen"> 
      
      <div className="p-10 w-full text-center bg-[#10b981] text-white">
        <h1 className="text-4xl font-black">StaK</h1>
        <span className="uppercase font-light text-lg">Seu gerenciador de tarefas pessoal!</span>
      </div>

      <div className="flex flex-col items-start pb-10 mt-10 p-6"> 
        <a className="bg-[#10b981] text-white px-4 py-2 rounded hover:bg-gray-600" href="./">Criar tarefas</a>
      </div>
      <h1 className="text-2xl font-bold mb-4 p-6">Tabela de Tarefas</h1>
      <div className="flex items-center mb-4 space-x-4 p-6">
        <label className="font-semibold">Mês:</label>
        <select
          className="border p-2 rounded focus:outline-0 focus:border-[#2ed573]"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="0">Janeiro</option>
          <option value="1">Fevereiro</option>
          <option value="2">Março</option>
          <option value="3">Abril</option>
          <option value="4">Maio</option>
          <option value="5">Junho</option>
          <option value="6">Julho</option>
          <option value="7">Agosto</option>
          <option value="8">Setembro</option>
          <option value="9">Outubro</option>
          <option value="10">Novembro</option>
          <option value="11">Dezembro</option>
        </select>

        {/* Botão para alternar ordenação (mais recente/antiga) */}
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => setSortByRecent((prev) => !prev)}
        >
          {sortByRecent ? "Crescente" : "Decrescente"}
        </button>

        {/* Botão para exportar para PDF */}
        <button
          className="bg-[#10b981] text-white px-3 py-1 rounded hover:bg-green-600"
          onClick={exportToPdf}
        >
          Exportar PDF
        </button>
      </div>

      {/* Tabela de eventos, já filtrada e ordenada */}
      <div className="overflow-x-auto p-6">
        <table className="min-w-full bg-white shadow-md rounded-2xl p-6">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Título</th>
              <th className="py-2 px-4 text-left">Descrição</th>
              <th className="py-2 px-4 text-left">Data</th>
            </tr>
          </thead>
          <tbody>
            {finalEvents.map((event) => (
              <tr key={event._id} className="border-b last:border-b-0">
                <td className="py-2 px-4">{event.title}</td>
                <td className="py-2 px-4">{event.description}</td>
                <td className="py-2 px-4">
                  {event.date && new Date(event.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}