"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { Button, Input, message, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  useAddFAQMutation,
  useDeleteFAQMutation,
  useGetFAQQuery,
  useUpdateFAQMutation,
} from "../../redux/features/faq/faqApi";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  // editingFaq is a clone of the faq being edited (local editable copy)
  const [editingFaq, setEditingFaq] = useState(null);

  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isLoading, isSuccess, refetch } = useGetFAQQuery();
  const [addFAQ] = useAddFAQMutation();
  const [deleteFAQ] = useDeleteFAQMutation();
  const [updateFAQ] = useUpdateFAQMutation();

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setFaqs(data.data.data);
    }
  }, [isSuccess, data, isLoading]);

  if (isLoading) {
    return <>Loading..</>;
  }

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEdit = (faq) => {
    // Clone the faq to avoid mutating original state directly
    setEditingFaq({ ...faq });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteFAQ({ id });
      if (response?.data?.status) {
        message.success("FAQ Deleted successfully!");
      } else {
        message.error(
          response?.message || "Something went wrong while Deleting FAQ."
        );
      }
    } catch (error) {
      console.error("Delete FAQ Error:", error);
      message.error("Failed to delete FAQ. Please try again.");
    }
    refetch();
  };

  const handleSaveEdit = async () => {
    if (!editingFaq || !editingFaq.answer.trim()) {
      message.error("Answer field cannot be empty.");
      return;
    }

    try {
      const readyData = {
        id: editingFaq.id,
        data: { answer: editingFaq.answer },
      };
      console.log("Updating FAQ with:", readyData);
      const response = await updateFAQ(readyData);
      console.log("Response:", response);

      if (response?.data?.status) {
        message.success("FAQ updated successfully!");
        setIsEditModalOpen(false);
        setEditingFaq(null);
        refetch();
      } else {
        message.error(response?.message || "Failed to update FAQ.");
      }
    } catch (error) {
      console.error("Update FAQ Error:", error);
      message.error("An error occurred while updating FAQ.");
    }
  };

  const handleAddNew = async () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      message.error("Please fill the question and answer input to add the FAQ");
      return;
    }

    try {
      const response = await addFAQ(newFaq);

      if (response?.data?.status) {
        message.success("FAQ added successfully!");
        setNewFaq({ question: "", answer: "" }); // reset form
        setIsAddModalOpen(false);
        refetch();
      } else {
        message.error(
          response?.message || "Something went wrong while adding FAQ."
        );
      }
    } catch (error) {
      console.error("Add FAQ Error:", error);
      message.error("Failed to add FAQ. Please try again.");
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">FAQ</h1>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg shadow-sm border">
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => handleToggle(faq.id)}
            >
              <h3 className="font-medium">{faq.question}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(faq);
                  }}
                  className="p-2 hover:bg-green-50 rounded-full"
                >
                  <Pencil className="w-4 h-4 text-green-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(faq.id);
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
      <Modal
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingFaq(null);
        }}
        open={isEditModalOpen}
        footer={null}
      >
        <div>
          <div>
            <h1>Edit FAQ</h1>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Question</label>
              <Input value={editingFaq?.question || ""} readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Answer</label>
              <TextArea
                value={editingFaq?.answer || ""}
                onChange={(e) =>
                  setEditingFaq((prev) =>
                    prev ? { ...prev, answer: e.target.value } : null
                  )
                }
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingFaq(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="!bg-red-500"
                type="primary"
                onClick={handleSaveEdit}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Add Modal */}
      <Modal
        onCancel={() => setIsAddModalOpen(false)}
        open={isAddModalOpen}
        footer={null}
      >
        <div>
          <div>
            <h1>Add New FAQ</h1>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Question</label>
              <Input
                value={newFaq.question}
                onChange={(e) =>
                  setNewFaq((prev) => ({ ...prev, question: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Answer</label>
              <TextArea
                value={newFaq.answer}
                onChange={(e) =>
                  setNewFaq((prev) => ({ ...prev, answer: e.target.value }))
                }
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button
                className="!bg-red-500"
                type="primary"
                onClick={handleAddNew}
              >
                Add FAQ
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Button
        onClick={() => setIsAddModalOpen(true)}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white text-[16px]"
      >
        Add more
      </Button>
    </div>
  );
}
