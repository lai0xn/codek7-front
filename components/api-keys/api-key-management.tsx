"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Copy, Trash2, Eye, EyeOff, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ApiKey {
  id: string
  name: string
  key: string
  permissions: string[]
  created: string
  lastUsed: string
  status: "active" | "inactive"
}

export function ApiKeyManagement() {
  const { toast } = useToast()
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Production API",
      key: "sk_live_1234567890abcdef",
      permissions: ["read", "write", "delete"],
      created: "2024-01-15",
      lastUsed: "2024-01-20",
      status: "active",
    },
    {
      id: "2",
      name: "Development API",
      key: "sk_test_abcdef1234567890",
      permissions: ["read", "write"],
      created: "2024-01-10",
      lastUsed: "2024-01-19",
      status: "active",
    },
    {
      id: "3",
      name: "Analytics Only",
      key: "sk_analytics_fedcba0987654321",
      permissions: ["read"],
      created: "2024-01-05",
      lastUsed: "Never",
      status: "inactive",
    },
  ])

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newKeyData, setNewKeyData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys((prev) => ({ ...prev, [keyId]: !prev[keyId] }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied to your clipboard.",
    })
  }

  const createApiKey = () => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyData.name,
      key: `sk_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      permissions: newKeyData.permissions,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
      status: "active",
    }

    setApiKeys((prev) => [...prev, newKey])
    setNewKeyData({ name: "", description: "", permissions: [] })
    setIsCreateDialogOpen(false)

    toast({
      title: "API Key Created",
      description: "Your new API key has been generated successfully.",
    })
  }

  const deleteApiKey = (keyId: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== keyId))
    toast({
      title: "API Key Deleted",
      description: "The API key has been permanently deleted.",
    })
  }

  const maskKey = (key: string) => {
    return key.substring(0, 8) + "..." + key.substring(key.length - 4)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">API Keys</h2>
          <p className="text-muted-foreground">Manage your API keys and access permissions</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>
                Generate a new API key with specific permissions for your application.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">Key Name</Label>
                <Input
                  id="keyName"
                  placeholder="e.g., Production API"
                  value={newKeyData.name}
                  onChange={(e) => setNewKeyData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this API key will be used for..."
                  value={newKeyData.description}
                  onChange={(e) => setNewKeyData((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="space-y-2">
                  {["read", "write", "delete", "admin"].map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={permission}
                        checked={newKeyData.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewKeyData((prev) => ({
                              ...prev,
                              permissions: [...prev.permissions, permission],
                            }))
                          } else {
                            setNewKeyData((prev) => ({
                              ...prev,
                              permissions: prev.permissions.filter((p) => p !== permission),
                            }))
                          }
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={permission} className="capitalize">
                        {permission}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createApiKey} disabled={!newKeyData.name}>
                  Create Key
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active API Keys</CardTitle>
            <CardDescription>
              Manage your API keys and their permissions. Keep your keys secure and rotate them regularly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell className="font-medium">{apiKey.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                        </code>
                        <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(apiKey.id)}>
                          {showKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(apiKey.key)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {apiKey.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {apiKey.created}
                      </div>
                    </TableCell>
                    <TableCell>{apiKey.lastUsed}</TableCell>
                    <TableCell>
                      <Badge variant={apiKey.status === "active" ? "default" : "secondary"}>{apiKey.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteApiKey(apiKey.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Keep your API keys secure</p>
                <p className="text-sm text-muted-foreground">
                  Never share your API keys in public repositories or client-side code.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Rotate keys regularly</p>
                <p className="text-sm text-muted-foreground">
                  Generate new API keys periodically and delete unused ones.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Use minimal permissions</p>
                <p className="text-sm text-muted-foreground">
                  Only grant the permissions that your application actually needs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
