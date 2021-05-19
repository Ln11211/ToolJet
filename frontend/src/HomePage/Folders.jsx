import React, { useState, useEffect } from 'react';
import { folderService } from '@/_services';
import { toast } from 'react-toastify';

export const Folders = function Folders({
  folders, foldersLoading, totalCount, currentFolder, folderChanged
}) {

  const [isLoading, setLoadingStatus] = useState(foldersLoading);

  useEffect(() => {
    setLoadingStatus(foldersLoading);
  }, [foldersLoading]);

  const [showForm, setShowForm] = useState(false);
  const [isCreating, setCreationStatus] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [activeFolder, setActiveFolder] = useState(currentFolder || {})

  function saveFolder() {
    setCreationStatus(true);
    folderService.create(newFolderName).then(() => {
      toast.info('folder created.', {
        hideProgressBar: true,
        position: 'top-left'
      });
      setCreationStatus(false);
      setShowForm(false);
      setNewFolderName('');
    })
  }

  function handleFolderChange(folder) {
    setActiveFolder(folder);
    folderChanged(folder);
  }

  return (<div className="w-100 mt-4 px-3 card">
    {isLoading && (
      <div className="p-5">
        <center>
          <div className="spinner-border text-azure" role="status"></div>
        </center>
      </div>
    )}

    {!isLoading && (
      <div className="list-group list-group-transparent mb-3">

        <a 
          class={`list-group-item list-group-item-action d-flex align-items-center ${!activeFolder.id ? 'active' : ''}`}
          
          onClick={() => handleFolderChange({})}
        >
          All applications
            <small className="text-muted ms-auto">
            <span class="badge bg-azure-lt">{totalCount}</span>
          </small>
        </a>
        {folders.map((folder) => 
          <a 
            class={`list-group-item list-group-item-action d-flex align-items-center ${activeFolder.id === folder.id ? 'active' : ''}`} 
            onClick={() => handleFolderChange(folder)}
          >
            {folder.name}
            <small className="text-muted ms-auto">
              <span class="badge bg-azure-lt">{folder.count}</span>
          </small>
        </a>
        )}
        <hr />
        {!showForm &&
          <a className="mx-3" onClick={() => setShowForm(true)}>
            + Folder
          </a>
        }
        {showForm && 
          <div className="p-2 row">
            <div className="col">
              <input
                onClick={() => onComponentClick(id, component)}
                type="text"
                type="text"
                onChange={(e) => setNewFolderName(e.target.value)}
                className="form-control"
                placeholder="folder name"
                disabled={isCreating}
              />
            </div>
            <div className="col-auto">
              <button className={`btn btn-primary ${isCreating ? 'btn-loading' : ''}`} onClick={saveFolder}>
                Save
              </button>
            </div>
          </div>
        }
      </div>
    )}
  </div>)
}
