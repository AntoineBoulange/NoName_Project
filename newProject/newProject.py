#!/usr/bin/env python
"""
    Arbalet - ARduino-BAsed LEd Table
    Time clock - simple time clock demonstrator.

    Copyright 2015 Joseph Silvestre, Yoan Mollard - Arbalet project - http://github.com/arbalet-project
    License: GPL version 3 http://www.gnu.org/licenses/gpl.html
"""

from arbalet.core import Application, Rate


class myProject(Application):
    def __init__(self, parser):
        Application.__init__(self, parser)
        self.show = True


    def run(self):
        while self.show:
            with self.model:
                self.model.set_all("deeppink")
                self.model.set_pixel(0, 0, 'cyan')
            raw_input()
            self.show = False

