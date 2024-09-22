import requests, os
from PIL import Image
from io import BytesIO

# Vraag om de URL van de afbeelding en de naam van het nieuwe bestand
url = input("Voer de URL van de afbeelding in: ")
if url:
    new_image_name = input("Voer de naam van het nieuwe bestand in (zonder extensie): ")
    image_path = f"./assets/{new_image_name}.transparent.png"

    # Controleer of het bestand al bestaat
    if os.path.exists(image_path):
        overwrite = input(f"Bestand {image_path} bestaat al. Overschrijven? (y/n): ").lower()
        if overwrite != 'y':
            print("Het bestand is niet overschreven.")
            exit()

    # Download de afbeelding
    response = requests.get(url)
    if response.status_code == 200:
        img = Image.open(BytesIO(response.content))
    else:
        print("Kon de afbeelding niet downloaden. Controleer de URL.")
        exit()

    # Zorg ervoor dat het een afbeelding met transparantie is (RGBA)
    img = img.convert("RGBA")

    # Verander witte pixels naar transparant
    datas = img.getdata()

    new_data = []
    for item in datas:
        # Change all white (also shades of whites) to transparent
        if item[0] > 200 and item[1] > 200 and item[2] > 200:
            # White pixel, make it transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    # Update image data
    img.putdata(new_data)

    # Opslaan als PNG om transparantie te behouden
    img.save(image_path, "PNG")
    print(f"Afbeelding opgeslagen als {image_path}")

# Bijsnijden
assets_folder = "./assets/"

# Loop door alle bestanden in de assets map
for filename in os.listdir(assets_folder):
    if filename.endswith(".transparent.png"):
        image_path = os.path.join(assets_folder, filename)

        # Open de afbeelding
        img = Image.open(image_path)
        img = img.convert("RGBA")

        # Verkrijg de bounding box van de niet-transparante delen
        bbox = img.getbbox()

        if bbox:
            # Snijd de afbeelding bij tot de bounding box + 10 pixels marge
            left = max(0, bbox[0] - 10)
            upper = max(0, bbox[1] - 10)
            right = min(img.width, bbox[2] + 10)
            lower = min(img.height, bbox[3] + 10)

            # Bijsnijden en opslaan
            cropped_img = img.crop((left, upper, right, lower))
            cropped_img.save(image_path)

            print(f"Bijsnijden voltooid voor {filename}")
        else:
            print(f"Geen zichtbare inhoud gevonden in {filename}")

print("Alle afbeeldingen zijn verwerkt.")