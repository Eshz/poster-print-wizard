
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useProjects } from '@/contexts/ProjectContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown, FilePlus, PenLine, Save, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { formatDistanceToNow } from 'date-fns';

const ProjectSwitcher = () => {
  const { 
    currentProject, 
    projects, 
    loadProject, 
    createNewProject, 
    saveCurrentProject,
    renameCurrentProject,
    deleteCurrentProject 
  } = useProjects();
  
  const [newProjectName, setNewProjectName] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);
  
  const handleCreateNewProject = () => {
    if (newProjectName.trim()) {
      createNewProject(newProjectName.trim());
      setNewProjectName('');
      setNewProjectDialogOpen(false);
    }
  };
  
  const handleRenameProject = () => {
    if (renameValue.trim()) {
      renameCurrentProject(renameValue.trim());
      setRenameValue('');
      setRenameDialogOpen(false);
    }
  };
  
  const formatDate = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            {currentProject?.name || 'Select Project'}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[250px]">
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {projects.map((project) => (
            <DropdownMenuItem 
              key={project.id}
              onClick={() => loadProject(project.id)}
              className="flex justify-between cursor-pointer"
            >
              <div className="flex flex-col">
                <span>{project.name}</span>
                <span className="text-xs text-muted-foreground">
                  Updated {formatDate(project.updatedAt)}
                </span>
              </div>
              {currentProject?.id === project.id && (
                <Check className="h-4 w-4 ml-2" />
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <Dialog open={newProjectDialogOpen} onOpenChange={setNewProjectDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                <FilePlus className="h-4 w-4 mr-2" />
                <span>New Project</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Enter a name for your new project.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="new-project-name">Project Name</Label>
                <Input
                  id="new-project-name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="My Amazing Poster"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewProjectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateNewProject}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button 
        variant="ghost" 
        size="icon" 
        onClick={saveCurrentProject} 
        title="Save Project"
      >
        <Save className="h-4 w-4" />
      </Button>
      
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            title="Rename Project"
          >
            <PenLine className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Project</DialogTitle>
            <DialogDescription>
              Enter a new name for your project.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="rename-project">Project Name</Label>
            <Input
              id="rename-project"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              placeholder={currentProject?.name}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameProject}>Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            title="Delete Project"
            className="hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              project "{currentProject?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteCurrentProject} className="bg-destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectSwitcher;
