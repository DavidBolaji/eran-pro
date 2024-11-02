'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { ChevronRight, Plus, Upload } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="container mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/dashboard" className="hover:text-foreground">
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Add Product</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        <div className="flex gap-3">
          <Button variant="outline">Discard Changes</Button>
          <Button>Add Product</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Product Details */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Product Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="product-name">Product name *</Label>
              <Input id="product-name" required />
            </div>
            <div>
              <Label htmlFor="product-description">Product description *</Label>
              {/* <Textarea id="product-description" className="min-h-[120px]" required /> */}
            </div>
          </div>
        </Card>

        {/* Product Image */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Product Image</h2>
          <p className="text-sm text-muted-foreground mb-2">*Must add at least one product image</p>
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm">Upload Images</p>
              <p className="text-xs text-muted-foreground">PNG, JPEG not more than 5mb in size.</p>
            </div>
            <Button variant="secondary" className="mt-4">
              Upload Images
            </Button>
          </div>
        </Card>

        {/* Product Price */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Product Price</h2>
          <div className="space-y-4">
            <div>
              <Label>Unit Type</Label>
              {/* <RadioGroup defaultValue="per-kg" className="flex gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="per-kg" id="per-kg" />
                  <Label htmlFor="per-kg">Per kg</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="per-item" id="per-item" />
                  <Label htmlFor="per-item">Per item</Label>
                </div>
              </RadioGroup> */}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price per unit</Label>
                <Input id="price" type="number" min="0" step="0.01" />
              </div>
              <div>
                <Label htmlFor="promotion">Select promotion to apply</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select promotion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="discount-10">10% Discount</SelectItem>
                    <SelectItem value="discount-20">20% Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Category */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Category</h2>
          <div className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="meat">Meat</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add New Category
            </Button>
          </div>
        </Card>

        {/* Inventory */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Inventory</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="in-stock">In stock</Label>
              {/* <Switch id="in-stock" /> */}
            </div>
            <div>
              <Label htmlFor="quantity">Quantity in stock *</Label>
              <Input id="quantity" type="number" min="0" required />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}