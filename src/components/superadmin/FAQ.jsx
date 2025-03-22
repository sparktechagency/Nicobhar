"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react"
import { Button, Input, Modal } from "antd"
import TextArea from "antd/es/input/TextArea"





export default function FAQ() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "Lorem ipsum dolor sit ?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Conque porttitor massa tristique mauris porta dolor. Aliquet donec ullamcorper malesuada leo tempus eu porttitor consectetur. Felis dapibus nullam massa potenti sed malesuada urna. Vulputate pellentesque mattis morbi etiam a facilisi mi nunc. Sollicitudin amet id erat sollicitudin est amet eros porttitor at. Sed vulputate pharetra arcu donec id. Dignissim facilisi duis sagittis at amet sed phasellus in orci. Elit tincidunt diam placerat porttitor eu euismod. Lobortis amet tincidunt nulla mattis nisl eget eget",
    },
    {
      id: 2,
      question: "Lorem ipsum dolor sit ?",
      answer: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      id: 3,
      question: "Lorem ipsum dolor sit ?",
      answer: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      id: 4,
      question: "Lorem ipsum dolor sit ?",
      answer: "Lorem ipsum dolor sit amet consectetur.",
    },
  ])

  const [expandedId, setExpandedId] = useState(1)
  const [editingFaq, setEditingFaq] = useState(null)
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleEdit = (faq) => {
    setEditingFaq(faq)
    setIsEditModalOpen(true)
  }

  const handleDelete = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id))
  }

  const handleSaveEdit = () => {
    if (editingFaq) {
      setFaqs(faqs.map((faq) => (faq.id === editingFaq.id ? editingFaq : faq)))
      setIsEditModalOpen(false)
      setEditingFaq(null)
    }
  }

  const handleAddNew = () => {
    if (newFaq.question && newFaq.answer) {
      setFaqs([
        ...faqs,
        {
          id: Math.max(...faqs.map((f) => f.id)) + 1,
          ...newFaq,
        },
      ])
      setNewFaq({ question: "", answer: "" })
      setIsAddModalOpen(false)
    }
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">FAQ</h1>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg shadow-sm border">
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => handleToggle(faq.id)}>
              <h3 className="font-medium">{faq.question}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEdit(faq)
                  }}
                  className="p-2 hover:bg-green-50 rounded-full"
                >
                  <Pencil className="w-4 h-4 text-green-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(faq.id)
                  }}
                  className="p-2 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
                {expandedId === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
            {expandedId === faq.id && (
              <div className="px-4 pb-4">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal onCancel={() => setIsEditModalOpen(false)} open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <div>
          <div>
            <h1>Edit FAQ</h1>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Question</label>
              <Input
                value={editingFaq?.question || ""}
                onChange={(e) => setEditingFaq((prev) => (prev ? { ...prev, question: e.target.value } : null))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Answer</label>
              <TextArea
                value={editingFaq?.answer || ""}
                onChange={(e) => setEditingFaq((prev) => (prev ? { ...prev, answer: e.target.value } : null))}
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Add Modal */}
      <Modal onCancel={() => setIsAddModalOpen(false)} open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <div>
          <div>
            <h1>Add New FAQ</h1>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Question</label>
              <Input
                value={newFaq.question}
                onChange={(e) => setNewFaq((prev) => ({ ...prev, question: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Answer</label>
              <TextArea
                value={newFaq.answer}
                onChange={(e) => setNewFaq((prev) => ({ ...prev, answer: e.target.value }))}
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNew}>Add FAQ</Button>
            </div>
          </div>
        </div>
      </Modal>

      <Button onClick={() => setIsAddModalOpen(true)} className="mt-6 bg-red-600 hover:bg-red-700 text-white text-[16px]">
        Add more
      </Button>
    </div>
  )
}

