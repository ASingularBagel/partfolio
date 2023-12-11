import { Divider, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'

function searchBarHome() {
  return (
    <div className="search-bar min-w-10 px-20 h-full flex flex-col align-middle justify-center">
                <div className="search-bar-wrapper flex flex-row items-center justify-center input transition-all duration-200 ease-in-out bg-charcoal-surface3 hover:bg-charcoal-transparent-press focus-within:bg-charcoal-surface3">
                    <div className="search-input">
                        <Paper
                            component="form"
                            sx={{
                                p: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
                                width: 500,
                                backgroundColor: 'transparent',
                                transition: 'all 0.2s ease-in-out',
                                boxShadow: 'none',
                            }}
                        >
                            <SearchIcon color="action" />
                            <Divider sx={{ height: 28, m: 0.5, display: 'none' }} orientation="vertical" />
                            <InputBase
                                sx={{
                                    ml: 1,
                                    flex: 1,
                                    color: 'RGB(214,214,214)',
                                    fontFamily: 'Arial',
                                    fontSize: '1rem',
                                    height: '2.5rem',
                                    border: 'none',
                                }}
                                placeholder="Search works"
                            />
                            <Divider sx={{ height: 28, m: 0.5, display: 'none' }} orientation="vertical" />
                        </Paper>
                    </div>
                </div>
            </div>
  )
}

export default searchBarHome