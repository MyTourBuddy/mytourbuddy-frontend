"use client";
import {
  PackageCreateForm,
  PackageEditForm,
} from "@/components/profile/edit/PackageInfoForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Package } from "@/schemas/package.schema";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TbPencil, TbPlus, TbTrash } from "react-icons/tb";

const PackagesPage = () => {
  const pathname = usePathname();
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [packages, setPackages] = useState<Package[]>([
    {
      id: "pkg001",
      guideId: "guide001",
      title: "Galle Fort Walking Tour",
      description: "A guided walking tour around Galle Fort.",
      price: 120,
      duration: "2 hours",
      location: "Galle",
      image: "",
    },
    {
      id: "pkg002",
      guideId: "guide001",
      title: "Beach Sunset Experience",
      description: "Watch the beautiful sunset at the beach with refreshments.",
      price: 100,
      duration: "3 hours",
      location: "Mirissa Beach",
      image: "",
    },
    {
      id: "pkg003",
      guideId: "guide001",
      title: "Mountain Hiking Adventure",
      description: "An exciting mountain hiking tour through scenic trails.",
      price: 150,
      duration: "5 hours",
      location: "Mountain Peak",
      image: "",
    },
  ]);

  const handleCreate = (data: Omit<Package, "id" | "guideId">) => {
    const newPackage: Package = {
      ...data,
      id: `pkg${Date.now()}`,
      guideId: "guide001",
    };
    setPackages((prev) => [...prev, newPackage]);
  };

  const handleEdit = (data: Omit<Package, "id" | "guideId">) => {
    if (!selectedPackage) return;
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === selectedPackage.id ? { ...pkg, ...data } : pkg
      )
    );
    setSelectedPackage(null);
  };

  const handleDelete = () => {
    if (!selectedPackage) return;
    console.log("Removing package with ID:", selectedPackage.id);

    setPackages((prev) => prev.filter((pkg) => pkg.id !== selectedPackage.id));
    setSelectedPackage(null);
    setDeleteOpen(false);
  };

  const openEditDialog = (pkg: Package) => {
    setSelectedPackage(pkg);
    setEditOpen(true);
  };

  const openDeleteDialog = (pkg: Package) => {
    setSelectedPackage(pkg);
    setDeleteOpen(true);
  };

  return (
    <section className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* header */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold">My Packages</h1>
            <p className="text-muted-foreground">
              Packages ({packages.length}/3)
            </p>
          </div>
          {packages.length < 3 && (
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <TbPlus />
                  Add Package
                </Button>
              </DialogTrigger>
              <DialogContent className="my-auto h-full max-h-[85vh] md:max-h-[95vh] overflow-y-auto [&>button]:hidden">
                <DialogHeader>
                  <DialogTitle>Add New Package</DialogTitle>
                  <DialogDescription>
                    Create a new tour package for your profile
                  </DialogDescription>
                </DialogHeader>
                <PackageCreateForm
                  onClose={() => setCreateOpen(false)}
                  onSubmit={handleCreate}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
        <Separator />
        {/* cards */}
        <div className="flex flex-col gap-4">
          {packages.length < 1 && "Create your first package 🦧"}
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className="flex flex-col md:flex-row justify-between p-2 md:p-4 bg-accent/30"
            >
              <Link
                href={`${pathname}/${pkg.id}`}
                className="flex flex-col md:flex-row gap-4 flex-1"
              >
                <div className="relative w-full md:w-48 h-48 bg-muted aspect-video md:aspect-square">
                  {pkg.image ? (
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.title}
                      fill
                      className="object-cover object-center aspect-video md:aspect-square rounded-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 rounded-md" />
                  )}
                </div>
                <div className="">
                  <h2 className="font-semibold text-lg mb-2 line-clamp-2">
                    {pkg.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 max-w-xs">
                    {pkg.description}
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <Badge className="text-sm">${pkg.price}</Badge>
                    <Badge variant="outline" className="text-sm">
                      {pkg.location}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {pkg.duration}
                    </Badge>
                  </div>
                </div>
              </Link>
              <div className="flex flex-col gap-3">
                <div className="flex md:hidden">
                  <Separator />
                </div>
                <ButtonGroup className="mx-auto">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEditDialog(pkg)}
                  >
                    <TbPencil />
                  </Button>
                  <Button
                    size="icon"
                    className="bg-destructive/85 hover:bg-destructive/95 duration-100"
                    onClick={() => openDeleteDialog(pkg)}
                  >
                    <TbTrash />
                  </Button>
                </ButtonGroup>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="my-auto h-full max-h-[85vh] md:max-h-[95vh] overflow-y-auto [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Edit Package</DialogTitle>
            <DialogDescription>Make changes in your package</DialogDescription>
          </DialogHeader>
          {selectedPackage && (
            <PackageEditForm
              onClose={() => {
                setEditOpen(false);
                setSelectedPackage(null);
              }}
              onSubmit={handleEdit}
              initialData={selectedPackage}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Delete Tour Package</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this tour package? This action
              cannot be undone and will permanently remove the package from your
              profile.
            </DialogDescription>
          </DialogHeader>
          <ButtonGroup className="md:ml-auto md:mr-0 mx-auto">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteOpen(false);
                setSelectedPackage(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PackagesPage;
