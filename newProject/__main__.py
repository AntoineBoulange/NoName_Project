import argparse
from .newProject import myProject

parser = argparse.ArgumentParser(description='Display the app you created on the Web simulator')


print("To stop simulation press Enter")
myProject(parser).start()
