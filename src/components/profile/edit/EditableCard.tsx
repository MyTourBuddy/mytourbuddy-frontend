"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { TbPencil } from "react-icons/tb";
import { Separator } from "../../ui/separator";
import { useState, createContext, useContext, useRef } from "react";

const EditContext = createContext(false);

export const useEditMode = () => useContext(EditContext);

interface EditableCardProps {
  title: string;
  children: React.ReactNode;
  onSave?: (formData: FormData) => void;
  defaultEdit?: boolean;
}

const EditableCard = ({
  title,
  children,
  onSave,
  defaultEdit = false,
}: EditableCardProps) => {
  const [edit, setEdit] = useState(defaultEdit);
  const formRef = useRef<HTMLFormElement>(null);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleCancel = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setEdit(!edit);
  };

  const handleSave = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      console.log("Form data:", data);
      onSave?.(formData);
    }
    setEdit(false);
  };

  return (
    <EditContext.Provider value={edit}>
      <Card>
        <CardHeader>
          <div className="flex w-full justify-between items-center">
            <CardTitle>{title}</CardTitle>
            {!edit && (
              <Button onClick={handleEdit} variant="outline" size="icon">
                <TbPencil />
              </Button>
            )}
          </div>
          <Separator />
        </CardHeader>
        <CardContent>
          <form ref={formRef}>{children}</form>

          {edit && (
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button onClick={handleCancel} variant="outline" type="button">
                Cancel
              </Button>
              <Button onClick={handleSave} type="button">
                Save
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </EditContext.Provider>
  );
};

export default EditableCard;
